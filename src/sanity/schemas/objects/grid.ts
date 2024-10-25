// create allied section schema with title(optional), description(optional), and list of allieds image

import { defineField, defineType } from "sanity";

export default defineType({
  name: "grid",
  title: "Grid",
  type: "object",
  description: "Grid of image, title, and description",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "customImage",
    }),
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
  ],
  preview: {
    select: {
      title: "title",
      media: "image.image",
    },
    prepare({ title, media }) {
      return {
        title: title || "No title",
        subtitle: "Grid",
        media,
      };
    },
  },
});
