// define testimonial section schema object, title, testimonials

import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonialSection",
  title: "Testimonial section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
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
        subtitle: "Testimonial section",
      };
    },
  },
});
