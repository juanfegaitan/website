import {
  aboutPageQuery,
  blogPageQuery,
  coursePageQuery,
  homePageQuery,
  pagesBySlugQuery,
  resourcesPageQuery,
} from "@/sanity/lib/queries";
import { Singletons } from "@/types";

export function useGetQueryLoad(load?: Singletons) {
  switch (load) {
    case Singletons.ABOUT:
      return aboutPageQuery;
    case Singletons.HOME:
      return homePageQuery;
    case Singletons.COURSE:
      return coursePageQuery;
    case Singletons.RESOURCES:
      return resourcesPageQuery;
    case Singletons.BLOG:
      return blogPageQuery;
    case Singletons.PAGE:
      return pagesBySlugQuery;
    default:
      return homePageQuery;
  }
}
