// create newsletter section schema with title(optional), description(optional), success message(optional), field name (input attributes), field email (input attributes), and submit button text

import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsletterSection",
  title: "Newsletter section",
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
      name: "successMessage",
      title: "Success message",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "placeholderName",
      title: "Placeholder name",
      type: "string",
    }),
    defineField({
      name: "placeholderEmail",
      title: "Placeholder email",
      type: "string",
    }),
    defineField({
      name: "submitText",
      title: "Submit text",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No title",
        subtitle: "Newsletter section",
      };
    },
  },
});
