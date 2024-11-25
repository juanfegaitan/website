import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallerySection",
  title: "Gallery Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    // title position
    defineField({
      name: "titlePosition",
      title: "Title Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "customImage",
        },
      ],
    }),
  ],
  preview: {
    select: {
      images: "images",
      image: "images.0.image",
      alt: "images.0.alt",
    },
    prepare({ images, image, alt }) {
      return {
        title: `Gallery section with ${images.length} images`,
        subtitle: `Alt text: ${alt}`,
        media: image,
      };
    },
  },
});
