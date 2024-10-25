import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
            }),
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "display",
      title: "Display as",
      description: "How should we display these images?",
      type: "string",
      options: {
        list: [
          { title: "Stacked on top of eachother", value: "stacked" },
          { title: "In-line", value: "inline" },
          { title: "Carousel", value: "carousel" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "zoom",
      title: "Zoom enabled",
      description: "Should we enable zooming of images?",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      images: "images",
      image: "images.0",
    },
    prepare({ images, image }) {
      return {
        title: `Gallery block of ${images.length} images`,
        subtitle: `Alt text: ${image.alt}`,
        media: image,
      };
    },
  },
});
