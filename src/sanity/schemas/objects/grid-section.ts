// create allied section schema with title(optional), description(optional), and list of allieds image

import { defineField, defineType } from "sanity";

export default defineType({
  name: "gridSection",
  title: "Grid section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
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
      name: "grids",
      title: "Grids",
      description: "Grids of images, title, and description",
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
        subtitle: "Grid section",
      };
    },
  },
});
