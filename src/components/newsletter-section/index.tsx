import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import {
  NewsletterSection as NewsletterSectionType,
  SectionsList,
  Singletons,
} from "@/types";
import { NewsletterSectionLayout } from "./newsletter-layout";

const NewsletterPreview = dynamic(() => import("./newsletter-preview"));

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function NewsletterSection({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const feature = getSection<NewsletterSectionType>(
    data.data.sections ?? [],
    SectionsList.NEWSLETTER_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return (
      <NewsletterPreview initial={data} _key={key} load={load} slug={slug} />
    );
  }

  return <NewsletterSectionLayout data={feature} />;
}
