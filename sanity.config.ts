"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import * as resolve from "@/sanity/plugins/resolve";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import page from "@/sanity/schemas/documents/page";
import post from "@/sanity/schemas/documents/post";
import property from "@/sanity/schemas/documents/property";
import resource from "@/sanity/schemas/documents/resource";
import service from "@/sanity/schemas/documents/service";
import testimonial from "@/sanity/schemas/documents/testimonial";
import accordion from "@/sanity/schemas/objects/accordion";
import allied from "@/sanity/schemas/objects/allied";
import alliedSection from "@/sanity/schemas/objects/allied-section";
import bgHero from "@/sanity/schemas/objects/bg-hero";
import cta from "@/sanity/schemas/objects/cta";
import ctaSection from "@/sanity/schemas/objects/cta-section";
import duration from "@/sanity/schemas/objects/duration";
import feature from "@/sanity/schemas/objects/feature";
import gallery from "@/sanity/schemas/objects/gallery";
import grid from "@/sanity/schemas/objects/grid";
import gridSection from "@/sanity/schemas/objects/grid-section";
import hero from "@/sanity/schemas/objects/hero";
import heroSlide from "@/sanity/schemas/objects/hero-slide";
import image from "@/sanity/schemas/objects/image";
import kindOfDepartment from "@/sanity/schemas/objects/kind-of-department";
import knowMore from "@/sanity/schemas/objects/know-more";
import lastEntriesSection from "@/sanity/schemas/objects/last-entries-section";
import mansorySection from "@/sanity/schemas/objects/mansory-section";
import markets from "@/sanity/schemas/objects/markets";
import milestone from "@/sanity/schemas/objects/milestone";
import newsletterSection from "@/sanity/schemas/objects/newsletter-section";
import portableTextSection from "@/sanity/schemas/objects/portable-text-section";
import projectCharacteristics from "@/sanity/schemas/objects/project-characteristics";
import projectLocation from "@/sanity/schemas/objects/project-location";
import propertiesSection from "@/sanity/schemas/objects/properties-section";
import seo from "@/sanity/schemas/objects/seo";
import servicesSection from "@/sanity/schemas/objects/services-section";
import stat from "@/sanity/schemas/objects/stat";
import stats from "@/sanity/schemas/objects/stats";
import testimonialSection from "@/sanity/schemas/objects/testimonial-section";
import timeline from "@/sanity/schemas/objects/timeline";
import youtubeSection from "@/sanity/schemas/objects/youtube-section";
import about from "@/sanity/schemas/singletons/about";
import blog from "@/sanity/schemas/singletons/blog";
import course from "@/sanity/schemas/singletons/course";
import home from "@/sanity/schemas/singletons/home";
import invest from "@/sanity/schemas/singletons/invest";
import market from "@/sanity/schemas/singletons/market";
import resources from "@/sanity/schemas/singletons/resources";
import services from "@/sanity/schemas/singletons/services";
import settings from "@/sanity/schemas/singletons/settings";
import { colorInput } from "@sanity/color-input";

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  "Next.js Personal Website with Sanity.io";

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      about,
      course,
      resources,
      blog,
      invest,
      market,
      services,
      // Documents
      testimonial,
      duration,
      page,
      resource,
      post,
      property,
      service,
      // Objects
      mansorySection,
      propertiesSection,
      markets,
      grid,
      gridSection,
      bgHero,
      heroSlide,
      lastEntriesSection,
      servicesSection,
      allied,
      alliedSection,
      newsletterSection,
      portableTextSection,
      projectLocation,
      milestone,
      timeline,
      cta,
      hero,
      ctaSection,
      image,
      seo,
      stat,
      stats,
      feature,
      testimonialSection,
      youtubeSection,
      accordion,
      gallery,
      knowMore,
      kindOfDepartment,
      projectCharacteristics,
    ],
  },
  plugins: [
    colorInput(),
    structureTool({
      structure: pageStructure([
        home,
        about,
        course,
        resources,
        blog,
        invest,
        settings,
        services,
        market,
      ]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft",
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([
      home.name,
      settings.name,
      about.name,
      course.name,
      resources.name,
      blog.name,
      services.name,
      market.name,
    ]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
