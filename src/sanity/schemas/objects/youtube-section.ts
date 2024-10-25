// create youtube section object title, description CustomPortableText, url

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  type: "object",
  name: "youtubeSection",
  title: "Youtube Section",
  fields: [
    defineField({
      name: "title",
      title: "Tite",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                  },
                ],
              },
            ],
          },
          type: "block",
        }),
      ],
    }),
    defineField({
      name: "url",
      title: "Youtube URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    // video title
    defineField({
      name: "videoTitle",
      title: "Video Title",
      type: "string",
      description: "Title of the video",
    }),
  ],
  preview: {
    select: {
      title: "title",
      link: "url",
    },
    prepare({ title, link }) {
      return {
        title: `Youtube Section: ${title ?? link}`,
      };
    },
  },
});
