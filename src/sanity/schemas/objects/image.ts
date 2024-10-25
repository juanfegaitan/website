import { defineField, defineType } from "sanity";

export default defineType({
  name: "customImage",
  title: "Custom Image",
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
      name: "alt",
      title: "Alt",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "alt",
    },
    prepare({ title }) {
      return {
        title: title || "No alt",
      };
    },
  },
});
