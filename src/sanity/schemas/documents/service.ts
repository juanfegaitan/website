// create  service (image, title, description)

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: () => "🛠️",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                  },
                ],
              },
            ],
          },
          type: "block",
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                  },
                ],
              },
            ],
          },
          type: "block",
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "cta",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "customImage",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    // define array of sections
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "ctaSection",
        }),
        defineArrayMember({
          type: "stats",
        }),
        defineArrayMember({
          type: "featureSection",
        }),
        defineArrayMember({
          type: "testimonialSection",
        }),
        defineArrayMember({
          type: "youtubeSection",
        }),
        defineArrayMember({
          type: "accordion",
        }),
        defineArrayMember({
          type: "know_more",
        }),
        defineArrayMember({
          type: "portableTextSection",
        }),
        defineArrayMember({
          type: "alliedSection",
        }),
        defineArrayMember({
          type: "newsletterSection",
        }),
        defineArrayMember({
          type: "servicesSection",
        }),
        defineArrayMember({
          type: "lastEntriesSection",
        }),
        defineArrayMember({
          type: "propertiesSection",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No title",
        subtitle: "Service",
      };
    },
  },
});
