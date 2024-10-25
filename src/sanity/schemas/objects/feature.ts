// create a feature section fields description portable text, title, image, position left or right

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "featureSection",
  title: "Feature Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Description",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {},
          styles: [],
          type: "block",
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "customImage",
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      initialValue: "left",
      description: "Position of the image",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "cta",
    }),
  ],
  preview: {
    select: {
      title: "title",
      position: "position",
    },
    prepare({ title, position }) {
      return {
        title: title || "No title",
        subtitle: `Feature section -> position: ${position}`,
      };
    },
  },
});
