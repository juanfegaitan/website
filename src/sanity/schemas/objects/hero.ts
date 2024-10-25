import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "bgColor",
      title: "Background color",
      type: "color",
      description: "The background color of the hero section",
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: "slides",
      title: "Slides description",
      type: "array",
      of: [{ type: "heroSlide" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare({ title, description }) {
      return {
        title: title || "No title",
        subtitle: `Hero section: ${description || "No description"}`,
      };
    },
  },
});
