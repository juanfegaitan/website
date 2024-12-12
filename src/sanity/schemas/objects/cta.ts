import { defineField, defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "reference",
      description: "Link to a page, resource, blog post, property",
      to: [
        {
          type: "home",
        },
        {
          type: "page",
        },
        {
          type: "about",
        },
        {
          type: "course",
        },
        {
          type: "resources",
        },
        {
          type: "blog",
        },
        {
          type: "invest",
        },
        {
          type: "service",
        },
        {
          type: "services",
        },
      ],
    }),
    defineField({
      name: "externalLink",
      title: "External link",
      type: "url",
      description: "Link to an external page",
    }),
    // variant
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      initialValue: "primary",
      icon: () => "🎨",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
          { title: "Destructive", value: "destructive" },
          { title: "Ghost", value: "ghost" },
          { title: "Link", value: "link" },
        ],
      },
    }),
    // define option modal
    defineField({
      name: "modal",
      title: "Modal",
      type: "string",
      description: "Open a modal",
      options: {
        list: [{ title: "Basic", value: "basic" }],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      variant: "variant",
    },
    prepare({ title, variant }) {
      return {
        title: title || "No title",
        subtitle: variant || "No variant",
      };
    },
  },
});
