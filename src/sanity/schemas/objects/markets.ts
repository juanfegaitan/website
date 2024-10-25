// allied schema

import { defineField, defineType } from "sanity";

export default defineType({
  name: "market",
  title: "Market",
  description: "Market",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "customImage",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "cta",
    }),
    defineField({
      name: "displayTitle",
      description: "Display title",
      title: "Display title",
      type: "string",
    }),
    defineField({
      name: "grid",
      title: "List",
      description: "List",
      type: "array",
      of: [
        {
          type: "grid",
        },
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
        subtitle: "Market",
      };
    },
  },
});
