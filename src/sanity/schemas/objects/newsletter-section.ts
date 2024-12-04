// create newsletter section schema with title(optional), description(optional), success message(optional), field name (input attributes), field email (input attributes), and submit button text

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { defineField, defineType } from "sanity";
import { TextAlign } from "../components/text-align";

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
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              {
                title: "Left",
                value: "left",
                icon: AlignLeftIcon,
                component: (props) => TextAlign(props),
              },
              {
                title: "Center",
                value: "center",
                icon: AlignCenterIcon,
                component: (props) => TextAlign(props),
              },
              {
                title: "Right",
                value: "right",
                icon: AlignRightIcon,
                component: (props) => TextAlign(props),
              },
              {
                title: "Justify",
                value: "justify",
                icon: AlignJustifyIcon,
                component: (props) => TextAlign(props),
              },
            ],
          },
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
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              {
                title: "Left",
                value: "left",
                icon: AlignLeftIcon,
                component: (props) => TextAlign(props),
              },
              {
                title: "Center",
                value: "center",
                icon: AlignCenterIcon,
                component: (props) => TextAlign(props),
              },
              {
                title: "Right",
                value: "right",
                icon: AlignRightIcon,
                component: (props) => TextAlign(props),
              },
              {
                title: "Justify",
                value: "justify",
                icon: AlignJustifyIcon,
                component: (props) => TextAlign(props),
              },
            ],
          },
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
