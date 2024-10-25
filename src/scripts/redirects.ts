import {
  aboutPageQuery,
  blogPageQuery,
  coursePageQuery,
  investPageQuery,
  marketPageQuery,
  queryServicesPage,
  resourcesPageQuery,
} from "@/sanity/lib/queries";
import { Singletons } from "@/types";
import { createClient } from "@sanity/client";
import "dotenv/config";
import fs from "fs";

import Redis from "ioredis";

const redis = new Redis(process.env.FULL_REDIS_URL!);

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // Ensure no accidental 'stale' data
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
});

const REDIRECTS_LIST = [
  Singletons.INVEST,
  Singletons.ABOUT,
  Singletons.RESOURCES,
  Singletons.COURSE,
  Singletons.BLOG,
  Singletons.SERVICES,
  Singletons.MARKET,
];

const INITIAL_REDIRECTS = {
  [Singletons.INVEST]: "/invest",
  [Singletons.ABOUT]: "/about",
  [Singletons.RESOURCES]: "/resources",
  [Singletons.COURSE]: "/course",
  [Singletons.BLOG]: "/blog",
  [Singletons.SERVICES]: "/servicios",
  [Singletons.MARKET]: "/mercados",
};

function transformEnvironmentPage(page: Singletons) {
  return `${process.env.NODE_ENV ?? "development"}-${page}`;
}

async function seedInitialRedirects() {
  await Promise.all(
    REDIRECTS_LIST.map(async (page) => {
      const slug = await redis.get(transformEnvironmentPage(page));
      const initialSlug = INITIAL_REDIRECTS[page];

      if (!slug) {
        console.log(`Seeding initial redirect for ${page} to ${initialSlug}`);
        await redis.set(transformEnvironmentPage(page), initialSlug);
      }
    }),
  );
}

function getQuery(page: Singletons) {
  switch (page) {
    case Singletons.INVEST:
      return investPageQuery;
    case Singletons.ABOUT:
      return aboutPageQuery;
    case Singletons.RESOURCES:
      return resourcesPageQuery;
    case Singletons.COURSE:
      return coursePageQuery;
    case Singletons.BLOG:
      return blogPageQuery;
    case Singletons.SERVICES:
      return queryServicesPage;
    case Singletons.MARKET:
      return marketPageQuery;
    default:
      return null;
  }
}

export async function generateRedirects() {
  try {
    await seedInitialRedirects();

    const allRedirects = REDIRECTS_LIST.map(async (page) => {
      const oldSlug = await redis.get(transformEnvironmentPage(page));

      console.log(`Checking ${page} for changes`);

      const newSlug = (await client.fetch(getQuery(page) as unknown as string))
        ?.slug;

      console.log(`New slug: ${newSlug}`);

      if (!newSlug) {
        console.log(`No slug found for ${page} - skipping`);
        return Promise.resolve();
      }

      console.log(`Old slug: ${oldSlug}`);

      if (!oldSlug) {
        console.log(`No old slug found for ${page} - skipping`);
        return Promise.resolve();
      }

      console.log(`Renaming ${oldSlug} to ${newSlug}`);

      if (!fs.existsSync(__dirname + `/../app/(website)/${oldSlug}`)) {
        console.log(`No directory found for ${oldSlug} - skipping`);
        await redis.set(transformEnvironmentPage(page), newSlug);
        return Promise.resolve();
      }

      fs.renameSync(
        __dirname + `/../app/(website)/${oldSlug}`,
        __dirname + `/../app/(website)/${newSlug}`,
      );

      console.log(`Updating redis key for ${page} to ${newSlug}`);

      await redis.set(transformEnvironmentPage(page), newSlug);

      console.log(`Redirects updated for ${page}`);
    });

    await Promise.all(allRedirects);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    redis.disconnect();
  }
}

generateRedirects();
