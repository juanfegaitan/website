import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createMiddleware, createSafeActionClient } from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";

type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

interface RateLimitConfig {
  enabled: boolean;
  prefix?: string;
  limit?: number;
  window?: Duration;
  redis?: {
    url: string;
    token: string;
  };
}

interface LogConfig {
  enabled: boolean;
  logger?: (message: LogMessage) => void;
}

interface ActionClientConfig {
  rateLimit?: RateLimitConfig;
  logging?: LogConfig;
}

interface LogMessage {
  event: string;
  data: Record<string, unknown>;
  status: StatusLog;
  timestamp: string;
  actionId?: string;
}

enum StatusLog {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

class ActionError extends Error {}

const DEFULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  enabled: true,
  limit: 10,
  window: "1 m",
  prefix: "basic-action",
  redis: {
    url: process.env.REDIS_URL!,
    token: process.env.REDIS_TOKEN!,
  },
};

const DEFAULT_LOG_CONFIG: LogConfig = {
  enabled: true,
};

// Create Redis and RateLimit instances based on config
const createRateLimiter = (config: RateLimitConfig) => {
  const redis = new Redis({
    url: config.redis?.url || process.env.REDIS_URL!,
    token: config.redis?.token || process.env.REDIS_TOKEN!,
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.limit || 5, config.window || "1m"),
  });
};

// Create standalone middlewares
const createLoggingMiddleware = (config: LogConfig) => {
  return createMiddleware().define(async ({ next, clientInput, metadata }) => {
    const startTime = performance.now();
    const result = await next();
    const endTime = performance.now();

    const logMessage = {
      event: "action_executed",
      data: {
        duration: `${endTime - startTime}ms`,
        input: clientInput,
        metadata,
        result,
      },
      timestamp: new Date().toISOString(),
      status: StatusLog.INFO,
    };

    if (config.logger) {
      config.logger(logMessage);
    } else {
      console.log(logMessage);
    }

    return result;
  });
};

const createRateLimitMiddleware = (
  rateLimiter: Ratelimit,
  config: RateLimitConfig | undefined = DEFULT_RATE_LIMIT_CONFIG,
) => {
  return createMiddleware().define(async ({ next, metadata }) => {
    const ip =
      headers().get("x-real-ip") ||
      headers().get("x-forwarded-for") ||
      "127.0.0.1";

    const prefix = config.prefix || "action";
    const key = `${prefix}-${metadata.actionName}-${ip}`;

    const { success, limit, reset, remaining } = await rateLimiter.limit(key);

    if (!success) {
      const logMessage = {
        event: "rate_limit_exceeded",
        data: {
          limit,
          reset,
          remaining,
          ip,
          window: config.window,
          actionName: metadata.actionName,
        },
        status: StatusLog.ERROR,
        timestamp: new Date().toISOString(),
      };

      console.log(logMessage);

      throw new ActionError(
        `Rate limit exceeded. Try again in ${Math.ceil(
          (reset - Date.now()) / 1000,
        )} seconds`,
      );
    }

    return next({ ctx: { ip } });
  });
};

// Create base action client
const baseClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return "An unexpected error occurred";
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
});

// Create enhanced action client with middlewares
export const createEnhancedActionClient = (config: ActionClientConfig = {}) => {
  let client = baseClient;

  // Add logging middleware if enabled
  if (config.logging?.enabled !== false) {
    client = client.use(
      createLoggingMiddleware(config.logging || DEFAULT_LOG_CONFIG),
    );
  }

  // Add rate limiting middleware if enabled
  if (config.rateLimit?.enabled !== false) {
    const rateLimiter = createRateLimiter(
      config.rateLimit || DEFULT_RATE_LIMIT_CONFIG,
    );
    client = client.use(
      createRateLimitMiddleware(
        rateLimiter,
        config.rateLimit || DEFULT_RATE_LIMIT_CONFIG,
      ),
    );
  }

  return client;
};

// Export default instance with standard configuration
export const actionClient = createEnhancedActionClient({
  rateLimit: {
    enabled: true,
    prefix: "basic-action",
  },
});

// Export types and utilities
export { ActionError, StatusLog };
export type { ActionClientConfig, LogConfig, LogMessage, RateLimitConfig };
