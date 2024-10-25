// define testimonial section schema object, title, testimonials

import { defineField, defineType } from "sanity";

export default defineType({
  name: "portableTextSection",
  title: "Seccion de texto enriquecido",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No title",
        subtitle: "Portable text section",
      };
    },
  },
});
