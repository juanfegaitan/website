// create allied section schema with title(optional), description(optional), and list of allieds image

import { defineField, defineType } from "sanity";

export default defineType({
  name: "propertiesSection",
  title: "Properties section",
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
      of: [{ type: "block" }],
    }),
    defineField({
      name: "properties",
      title: "Properties",
      description: "List of properties to display",
      type: "array",
      of: [{ type: "reference", to: [{ type: "property" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No title",
        subtitle: "Properties section",
      };
    },
  },
});
