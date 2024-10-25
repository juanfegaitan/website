import { NotebookPen } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "blog",
  title: "Blog Page",
  type: "document",
  icon: NotebookPen,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: "title",
      description: "This field is the title of your personal website.",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "hero",
      title: "Hero section",
      type: "hero",
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
          type: "gridSection",
        }),
        defineArrayMember({
          type: "propertiesSection",
        }),
        defineArrayMember({
          type: "mansorySection",
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
        subtitle: "Blog",
        title,
      };
    },
  },
});
