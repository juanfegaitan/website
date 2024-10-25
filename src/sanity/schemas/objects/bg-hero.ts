// bg hero, receive bg image or video. title, subtitle

import { defineField, defineType } from "sanity";

export default defineType({
  type: "object",
  name: "bgHero",
  title: "Background Hero",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "bgVideo",
      title: "Background Video",
      type: "file",
      // validate file type to be mp4
      options: {
        accept: "video/mp4",
      },
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "bg",
      title: "Background",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        subtitle: "Course Hero",
        title,
      };
    },
  },
});
