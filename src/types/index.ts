import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

import type { Image, ImageAsset, PortableTextBlock } from "sanity";

export enum SectionsList {
  CTA_SECTION = "ctaSection",
  STATS_SECTION = "stats",
  FEATURE_SECTION = "featureSection",
  TESTIMONIAL_SECTION = "testimonialSection",
  YOUTUBE_SECTION = "youtubeSection",
  ACCORDION_SECTION = "accordion",
  KNOW_MORE = "know_more",
  PORTABLE_TEXT = "portableTextSection",
  ALLIEDS_SECTION = "alliedSection",
  NEWSLETTER_SECTION = "newsletterSection",
  SERVICES_SECTION = "servicesSection",
  LAST_ENTRIES_SECTION = "lastEntriesSection",
  GRID_SECTION = "gridSection",
  PROPERTIES_SECTION = "propertiesSection",
  MANSORY_SECTION = "mansorySection",
}

export interface Seo {
  description?: PortableTextBlock[];
  image?: Image;
  title?: string;
}

export interface CustomImage {
  alt?: string;
  image?: Image & {
    asset: ImageAsset;
  };
}
export interface Cta {
  externalLink?: string;
  link?: {
    _type: string;
    slug?: string;
    title?: string;
  };
  title?: string;
  variant?: string;
}

export interface Stat {
  description?: string;
  icon?: CustomImage;
  title?: string;
  value?: string;
  _key: string;
  _id: string;
}

export interface MansorySection {
  title?: string;
  description?: PortableTextBlock[];
  _type: SectionsList.MANSORY_SECTION;
  gallery?: CustomImage[];
  _key: string;
}

export interface StatsSection {
  stats?: Stat[];
  title?: string;
  _type: SectionsList.STATS_SECTION;
  _key: string;
  bgColor?: Color;
}

export interface KnowMore {
  customPortableText?: PortableTextBlock[];
  description?: PortableTextBlock[];
  gallery?: Gallery;
  title?: string;
  _type: SectionsList.KNOW_MORE;
  _key: string;
}

export interface TestimonialSection {
  testimonials?: TestimonialPayload[];
  title?: string;
  _type: SectionsList.TESTIMONIAL_SECTION;
  _key: string;
}

export interface YoutubeSection {
  description?: PortableTextBlock[];
  title?: string;
  url: string;
  _type: SectionsList.YOUTUBE_SECTION;
  _key: string;
  videoTitle?: string;
}

export interface FeatureSection {
  content?: PortableTextBlock[];
  image?: CustomImage;
  position?: PositionImageList;
  title?: string;
  _type: SectionsList.FEATURE_SECTION;
  cta?: Cta;
  _key: string;
}

export interface CtaSection {
  cta?: Cta;
  description?: PortableTextBlock[];
  title?: string;
  _type: SectionsList.CTA_SECTION;
  _key: string;
}

export type PositionImageList = "left" | "right";

export interface HeroSlide {
  content?: PortableTextBlock[];
  image?: CustomImage;
  cta?: Cta;
  _key: string;
  position?: PositionImageList;
  stats?: Stat[];
}
export interface Hero {
  slides: HeroSlide[];
  title?: string;
  bgColor?: Color;
}

export interface MenuItem {
  _type: string;
  slug?: string;
  title?: string;
}

export interface MilestoneItem {
  description?: string;
  duration?: {
    start?: string;
    end?: string;
  };
  image?: Image;
  tags?: string[];
  title?: string;
}

export interface ShowcaseProject {
  _type: string;
  coverImage?: Image;
  overview?: PortableTextBlock[];
  slug?: string;
  tags?: string[];
  title?: string;
}

// Page payloads

export type Sections =
  | CtaSection
  | StatsSection
  | FeatureSection
  | TestimonialSection
  | YoutubeSection
  | AccordionSection
  | KnowMore
  | PortableTextSection
  | AlliedsSection
  | NewsletterSection
  | ServicesSection
  | LastEntriesSection
  | GridSection
  | PropertiesSection
  | MansorySection;

export enum Singletons {
  ABOUT = "about",
  HOME = "home",
  SETTINGS = "settings",
  COURSE = "course",
  RESOURCES = "resources",
  BLOG = "blog",
  PAGE = "page",
  INVEST = "invest",
  SERVICE = "service",
  SERVICES = "services",
  MARKET = "market",
}

export interface Color {
  _type: string;
  hex: string;
  hsv: Hsv;
  rgb: Rgb;
  hsl: Hsl;
  alpha: number;
}

export interface Hsv {
  v: number;
  _type: string;
  h: number;
  a: number;
  s: number;
}

export interface Rgb {
  b: number;
  r: number;
  g: number;
  _type: string;
  a: number;
}

export interface Hsl {
  s: number;
  _type: string;
  h: number;
  l: number;
  a: number;
}

export interface HomePagePayload extends FullPagePayload {
  _type: Singletons.HOME;
}

export interface AboutPagePayload extends FullPagePayload {
  _type: Singletons.ABOUT;
}

export interface ResourcesPagePayload extends FullPagePayload {
  _type: Singletons.RESOURCES;
}

export interface ServicesPagePayload extends FullPagePayload {
  _type: Singletons.SERVICES;
}

export interface CoursePagePayload extends FullPagePayload {
  _type: Singletons.COURSE;
}

export interface PagePayload extends FullPagePayload {
  body?: PortableTextBlock[];
  name?: string;
  slug?: string;
}

export interface ProjectPayload {
  client?: string;
  coverImage?: Image;
  description?: PortableTextBlock[];
  duration?: {
    start?: string;
    end?: string;
  };
  overview?: PortableTextBlock[];
  site?: string;
  slug: string;
  tags?: string[];
  title?: string;
}

export interface SettingsPayload {
  gtm?: string;
  footer?: PortableTextBlock[];
  socialMedia?: {
    name?: string;
    url?: string;
  }[];
  logo?: CustomImage;
  phone?: string;
  email?: string;
  address?: string;
  menuItems?: MenuItem[];
  title?: string;
  seo?: Seo;
  theme?: {
    alpha: 1;
    _type: "color";
    hex: string;
  } | null;
  contactCta?: Cta;
  privacyPolicy?: {
    content?: PortableTextBlock[];
    seo?: Seo;
    title?: string;
    slug?: string;
  };
}

export interface AlliedsSection {
  title?: string;
  description?: PortableTextBlock[];
  allieds?: {
    title?: string;
    description?: PortableTextBlock[];
    image?: CustomImage;
    _key: string;
  }[];
  _type: SectionsList.ALLIEDS_SECTION;
  _key: string;
}

export interface NewsletterSection {
  title?: string;
  description?: PortableTextBlock[];
  _type: SectionsList.NEWSLETTER_SECTION;
  _key: string;
  successMessage?: PortableTextBlock[];
  placeholderName?: string;
  placeholderEmail?: string;
  submitText?: string;
}

export interface BgHero {
  title?: string;
  bgVideo?: string;
  subtitle?: PortableTextBlock[];
  bg?: CustomImage["image"];
}

export interface Service {
  title?: string;
  _id: string;
  shortDescription?: PortableTextBlock[];
  description?: PortableTextBlock[];
  _type: string;
  slug?: string;
  seo?: Seo;
  sections?: Sections[];
  cta?: Cta;
  image?: CustomImage;
}

export interface ServicesSection {
  title?: string;
  description?: PortableTextBlock[];
  _type: SectionsList.SERVICES_SECTION;
  _key: string;
  services?: Service[];
}

export interface LastEntriesSection {
  title?: string;
  description?: PortableTextBlock[];
  _type: SectionsList.LAST_ENTRIES_SECTION;
  _key: string;
}

export interface AccordionSection {
  title?: string;
  description?: PortableTextBlock[];
  items?: {
    title?: string;
    description?: PortableTextBlock[];
    _key: string;
  }[];
  _type: SectionsList.ACCORDION_SECTION;
  _key: string;
}

export interface PortableTextSection {
  title?: string;
  body?: PortableTextBlock[];
  _type: SectionsList.PORTABLE_TEXT;
  _key: string;
}

export interface TestimonialPayload {
  image?: CustomImage;
  name?: string;
  review?: string;
  subtitle?: string;
  video?: string;
}

type GalleryImage = CustomImage["image"] & {
  alt?: string;
};

export type GalleryDisplay = "stacked" | "inline" | "carousel";
export interface Gallery {
  images: GalleryImage[];
  display: GalleryDisplay;
  zoom: boolean;
}

export type ColorVariables = {
  "--background": string;
  "--foreground": string;
  "--card": string;
  "--card-foreground": string;
  "--popover": string;
  "--popover-foreground": string;
  "--primary": string;
  "--primary-foreground": string;
  "--secondary": string;
  "--secondary-foreground": string;
  "--muted": string;
  "--muted-foreground": string;
  "--accent": string;
  "--accent-foreground": string;
  "--destructive": string;
  "--destructive-foreground": string;
  "--border": string;
  "--input": string;
  "--ring": string;
};

export type FullPagePayload = {
  footer?: PortableTextBlock[];
  showcaseProjects?: ShowcaseProject[];
  title?: string;
  hero?: Hero;
  sections?: Sections[];
  seo?: Seo;
  slug?: string;
  bgHero?: BgHero;
};

export type Resource = {
  _id: string;
  description: PortableTextBlock[];
  image: CustomImage;
  title: string;
  _type: string;
  slug: string;
  seo?: Seo;
  resource?: string;
  download?: {
    asset: {
      url: string;
    };
  };
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  content: PortableTextBlock[];
  image: CustomImage;
  seo?: Seo;
  _type: string;
};

export interface BlogPagePayload extends FullPagePayload {
  _type: Singletons.BLOG;
}

export interface InvestPagePayload extends FullPagePayload {
  _type: Singletons.INVEST;
}

export interface MarketPagePayload extends FullPagePayload {
  _type: Singletons.MARKET;
}

interface ProjectCharacteristics {
  _type: "projectCharacteristics";
  _key: string;
  label: string;
  value: string;
}

interface KindOfDepartment {
  image: Image;
  area: number;
}
export interface PropertyDocument {
  _id: string;
  _type: "property";
  deliveryDate?: string;
  name: string;
  slug: string;
  price?: number;
  occupancy?: number;
  gallery?: Gallery;
  averageRent?: number;
  description?: PortableTextBlock[];
  capitalGain?: number;
  characteristics?: ProjectCharacteristics[];
  highlight?: boolean;
  highlightText?: string;
  location?: {
    _type: "projectLocation";
    geopoint?: {
      lat?: number;
      lng?: number;
    };
    country?: string;
    state?: string;
    city?: string;
    address?: string;
    map?: Image;
  };
  seo?: Seo;
  similarProperties?: PropertyDocument[];
  kindOfDepartments?: KindOfDepartment[];
}

export interface Grid {
  title?: string;
  description?: PortableTextBlock[];
  image?: CustomImage;
  _type: "grid";
  _key: string;
}

export interface GridSection {
  title?: string;
  description?: PortableTextBlock[];
  grids?: Grid[];
  _type: SectionsList.GRID_SECTION;
  _key: string;
}

export interface PropertiesSection {
  title?: string;
  description?: PortableTextBlock[];
  properties?: PropertyDocument[];
  _type: SectionsList.PROPERTIES_SECTION;
  _key: string;
}

export interface MarketDocument {
  _id: string;
  _type: "market";
  title?: string;
  image?: CustomImage;
  description?: PortableTextBlock[];
  cta?: Cta;
  displayTitle?: string;
  grid?: Grid[];
  _key: string;
}
