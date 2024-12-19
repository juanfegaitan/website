// define testimonial schema document, name, review, rating, image

import { User2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: User2,
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Name",
      validation: (rule) => rule.required(),
    }),
    // subtitle: string, any value to use like job title
    defineField({
      type: "string",
      description: "Any value to use like job title",
      name: "subtitle",
      title: "Subtitle",
    }),
    defineField({
      type: "text",
      name: "review",
      title: "Review",
    }),
    defineField({
      type: "customImage",
      name: "image",
      title: "Image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "file",
      name: "video",
      title: "Video",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "previewGif",
      title: "Preview GIF",
      type: "file",
      options: {
        accept: "image/gif",
      },
    }),
  ],
  preview: {
    select: {
      name: "name",
      review: "review",
      rating: "rating",
      media: "image",
    },
    prepare(selection) {
      const { name, review, media } = selection;
      return {
        title: name,
        subtitle: review,
        media,
      };
    },
  },
});
