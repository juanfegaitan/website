
import { CallToActionSection } from "@/components/call-to-action-section";
import { Feature } from "@/components/feature-section";
import { Stats } from "@/components/stats-section";
import { Testimonials } from "@/components/testimonials";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import { SectionsList, Singletons } from "@/types";
import omit from 'just-omit';
import { AccordionSection } from "./accordion-section";
import { AlliedsSection } from "./allieds-section";
import { GallerySection } from "./gallery-section";
import { GridSection } from "./grid-section";
import { KnowMoreSection } from "./know-more-section";
import { LastEntriesSection } from "./last-entries";
import { LazySection } from "./lazy-component";
import { MansorySection } from "./mansory-section";
import { NewsletterSection } from "./newsletter-section";
import { PortableTextSectionComponent } from "./portable-text-section";
import { PropertiesSection } from "./properties-section";
import { ServicesSection } from "./services-section";
import { YoutubeSection } from "./youtube-section";


type SectionProps = {
  load?: Singletons;
  slug?: string;
};

export async function Sections({ load = Singletons.HOME, slug }: SectionProps) {
  const data = await loadSingleton(load, slug);

  const renderSection = (section, index: number) => {
    const sectionProps = {
      key: section._key,
      _key: section._key,
      load,
      slug,
    };

    const sectionComponents = {
      [SectionsList.GALERY_SECTION]: GallerySection,
      [SectionsList.MANSORY_SECTION]: MansorySection,
      [SectionsList.PROPERTIES_SECTION]: PropertiesSection,
      [SectionsList.GRID_SECTION]: GridSection,
      [SectionsList.LAST_ENTRIES_SECTION]: LastEntriesSection,
      [SectionsList.SERVICES_SECTION]: ServicesSection,
      [SectionsList.NEWSLETTER_SECTION]: NewsletterSection,
      [SectionsList.ALLIEDS_SECTION]: AlliedsSection,
      [SectionsList.PORTABLE_TEXT]: PortableTextSectionComponent,
      [SectionsList.CTA_SECTION]: CallToActionSection,
      [SectionsList.STATS_SECTION]: Stats,
      [SectionsList.FEATURE_SECTION]: Feature,
      [SectionsList.TESTIMONIAL_SECTION]: Testimonials,
      [SectionsList.YOUTUBE_SECTION]: YoutubeSection,
      [SectionsList.ACCORDION_SECTION]: AccordionSection,
      [SectionsList.KNOW_MORE]: KnowMoreSection,
    };

    const SectionComponent = sectionComponents[section._type];
    if (!SectionComponent) return null;

    if (index <= 1) {
      return (
        <SectionComponent key={section._key} {...omit(section, 'key')} />
      );
    }

    return (
      <LazySection key={section._key}>
        <SectionComponent {...sectionProps} />
      </LazySection>
    );
  };

  return (
    <>
      {data?.data?.sections?.map(renderSection)}
    </>
  );
}
