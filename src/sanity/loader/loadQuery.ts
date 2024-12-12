import "server-only";

import * as queryStore from "@sanity/react-loader";
import { draftMode } from "next/headers";

import { client } from "@/sanity/lib/client";
import {
  aboutPageQuery,
  blogPageQuery,
  coursePageQuery,
  homePageQuery,
  investPageQuery,
  marketPageQuery,
  marketsQuery,
  pagesBySlugQuery,
  postBySlug,
  postsPageQuery,
  postsQuery,
  postsTotalQuery,
  projectBySlugQuery,
  propertiesQuery,
  propertyBySlug,
  queryAllServices,
  queryLastEntries,
  queryServiceBySlug,
  queryServicesPage,
  resourceBySlug,
  resourcesPageQuery,
  resourcesQuery,
  settingsQuery,
} from "@/sanity/lib/queries";
import { token } from "@/sanity/lib/token";
import {
  AboutPagePayload,
  BlogPagePayload,
  HomePagePayload,
  InvestPagePayload,
  MarketDocument,
  MarketPagePayload,
  PagePayload,
  Post,
  ProjectPayload,
  PropertyDocument,
  Resource,
  ResourcesPagePayload,
  Service,
  ServicesPagePayload,
  SettingsPayload,
  Singletons,
} from "@/types";
import { groq } from "next-sanity";

const serverClient = client.withConfig({
  token,
  // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
  stega: process.env.VERCEL_ENV === "preview",
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ? "previewDrafts" : "published",
  } = options;
  // Don't cache by default
  let revalidate: NextFetchRequestConfig["revalidate"] = 0;
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false;
  } else if (usingCdn) {
    revalidate = 60;
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    // Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
    stega: draftMode().isEnabled,
  });
}) satisfies typeof queryStore.loadQuery;

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadSettings() {
  return loadQuery<SettingsPayload>(
    settingsQuery,
    {},
    { next: { tags: ["settings", "home", "page", "project"] } },
  );
}

export function loadHomePage() {
  return loadQuery<HomePagePayload>(
    homePageQuery,
    {},
    { next: { tags: ["home", "project"] } },
  );
}

export function loadProject(slug: string) {
  return loadQuery<ProjectPayload | null>(
    projectBySlugQuery,
    { slug },
    { next: { tags: [`project:${slug}`] } },
  );
}

export function loadPage(slug?: string) {
  return loadQuery<PagePayload>(
    pagesBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } },
  );
}

export function loadService(slug?: string) {
  return loadQuery<Service>(
    queryServiceBySlug,
    { slug },
    { next: { tags: [`service:${slug}`] } },
  );
}

export function loadAboutPage() {
  return loadQuery<AboutPagePayload>(
    aboutPageQuery,
    {},
    { next: { tags: ["about", "page"] } },
  );
}

export function loadCoursePage() {
  return loadQuery<AboutPagePayload>(
    coursePageQuery,
    {},
    { next: { tags: ["course", "page"] } },
  );
}

export function loadResourcePage() {
  return loadQuery<ResourcesPagePayload>(
    resourcesPageQuery,
    {},
    { next: { tags: ["resources", "page"] } },
  );
}

export function loadServicesPage() {
  return loadQuery<ServicesPagePayload>(
    queryServicesPage,
    {},
    { next: { tags: ["services", "page"] } },
  );
}

export function loadResources() {
  return loadQuery<Resource[]>(
    resourcesQuery,
    {},
    { next: { tags: ["resources", "documents"] } },
  );
}

export function loadServices() {
  return loadQuery<Service[]>(
    queryAllServices,
    {},
    { next: { tags: ["services", "documents"] } },
  );
}

export function loadResource(slug: string) {
  return loadQuery<Resource | null>(
    resourceBySlug,
    { slug },
    { next: { tags: [`resource:${slug}`] } },
  );
}

export function loadBlogPage() {
  return loadQuery<BlogPagePayload>(
    blogPageQuery,
    {},
    { next: { tags: ["blog", "page"] } },
  );
}

export function loadInvestPage() {
  return loadQuery<InvestPagePayload>(
    investPageQuery,
    {},
    { next: { tags: ["invest", "page"] } },
  );
}

export function loadMarketPage() {
  return loadQuery<MarketPagePayload>(
    marketPageQuery,
    {},
    { next: { tags: ["market", "page"] } },
  );
}

export function loadMarkets() {
  return loadQuery<{
    markets?: MarketDocument[];
  }>(marketsQuery, {}, { next: { tags: ["markets", "document"] } });
}

export function loadBlog(slug: string) {
  return loadQuery<Post | null>(
    postBySlug,
    { slug },
    { next: { tags: [`post:${slug}`] } },
  );
}

export function loadBlogPosts() {
  return loadQuery<Post[]>(
    postsQuery,
    {},
    { next: { tags: ["blog", "posts"] } },
  );
}

export function loadBlogPostsByPage(
  page: number,
  perPage: number,
  slug: string,
) {
  let validatedPage = page;

  if (page <= 0) {
    validatedPage = 1;
  }

  // validate page is a number
  if (isNaN(validatedPage)) {
    validatedPage = 1;
  }

  return loadQuery<Post[]>(
    postsPageQuery,
    {
      start: (validatedPage - 1) * perPage,
      end: validatedPage * perPage,
      slug,
    },
    { next: { tags: ["blog", "posts", `page:${page}`] } },
  );
}
export function loadTotalPosts(slug: string) {
  return loadQuery<number>(
    postsTotalQuery,
    {
      slug,
    },
    { next: { tags: ["blog", "posts", "total"] } },
  );
}

export function loadSingleton(load?: Singletons, slug?: string) {
  if (load === Singletons.ABOUT) {
    return loadAboutPage();
  }

  if (load === Singletons.MARKET) {
    return loadMarketPage();
  }

  if (load === Singletons.HOME) {
    return loadHomePage();
  }

  if (load === Singletons.COURSE) {
    return loadCoursePage();
  }

  if (load === Singletons.RESOURCES) {
    return loadResourcePage();
  }

  if (load === Singletons.BLOG) {
    return loadBlogPage();
  }

  if (load === Singletons.PAGE) {
    return loadPage(slug);
  }

  if (load === Singletons.SERVICE) {
    return loadService(slug);
  }

  if (load === Singletons.SERVICES) {
    return loadServicesPage();
  }

  return loadHomePage();
}

export function loadProperties() {
  return loadQuery<PropertyDocument[]>(
    propertiesQuery,
    {},
    { next: { tags: ["properties"] } },
  );
}

export function loadProperty(slug: string) {
  return loadQuery<PropertyDocument | null>(
    propertyBySlug,
    { slug },
    { next: { tags: [`property:${slug}`] } },
  );
}

export function loadLastEntries() {
  return loadQuery<Post[]>(
    queryLastEntries,
    {},
    {
      next: { tags: ["last-entries"] },
    },
  );
}

export function loadDocumentByQParam(q: string) {
  return loadQuery<Post[]>(
    groq`
      *[
        (_type == "post" && (title match "${q}*"|| pt::text(content) match "${q}*")) ||
        (_type == "property" && (name match "${q}*"|| pt::text(description) match "${q}*")) ||
        (_type == "service" && (title match "${q}*"|| pt::text(description) match "${q}*")) ||
        (_type == "resource" && (title match "${q}*"|| pt::text(description) match "${q}*"))
      ] | score(pt::text(description) match "${q}*", boost(title match "${q}*", 3), boost(description match "${q}*", 2))
        {
          _id,
          _type,
          title,
          name,
          content,
          image{
            ...,
            image{
              asset->{
                ...,
                "_ref": _id,
              },
            },
          },
          description,
          "slug": slug.current,
          "shortDescription": pt::text(coalesce(description, content))[0..200]
        }
    `,
    { q: q.trim().toLowerCase() },
    {
      next: { tags: ["search", "documents", q] },
    },
  );
}
