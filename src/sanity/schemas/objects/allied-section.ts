// create allied section schema with title(optional), description(optional), and list of allieds image

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "alliedSection",
  title: "Allied section",
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
      name: "allieds",
      title: "Allieds",
      type: "array",
      of: [
        {
          type: "allied",
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
        subtitle: "Allied section",
      };
    },
  },
});
