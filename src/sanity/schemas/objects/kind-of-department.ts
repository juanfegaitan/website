// define object kindOfDepartment with image and area

import { defineField, defineType } from "sanity";

export default defineType({
  name: "kindOfDepartment",
  title: "Kind Of Department",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["palette", "lqip"],
      },
    }),
    defineField({
      name: "area",
      title: "Area",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "area",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "No area",
        media,
      };
    },
  },
});
