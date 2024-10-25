import { defineField, defineType } from "sanity";

export default defineType({
  name: "stats",
  title: "Stats section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "stat" }],
    }),
    defineField({
      name: "bgColor",
      title: "Background color",
      type: "color",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No title",
        subtitle: "Stats section",
      };
    },
  },
});
