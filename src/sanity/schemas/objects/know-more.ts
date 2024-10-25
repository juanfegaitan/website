// know more object, gallery field, title, description customPortableText

import { defineField, defineType } from "sanity";

export default defineType({
  name: "know_more",
  title: "Know More",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "gallery",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      gallery: "gallery",
    },
    prepare({ title, description, gallery }) {
      return {
        title: title || "Know More",
        subtitle: description?.[0]?.children?.[0]?.text || "No description",
        media: gallery?.images?.[0]?.asset,
      };
    },
  },
});
