import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { defineField, defineType } from "sanity";
import { TextAlign } from "../components/text-align";

export default defineType({
  name: "heroSlide",
  title: "Hero slide",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "customImage",
    }),
    defineField({
      name: "content",
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
            annotations: [
              {
                title: "Inline Icon",
                name: "inlineicon",
                type: "image",
                icon: () => "🖼️",
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "cta",
    }),
    defineField({
      name: "position",
      title: "Position of the content",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
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
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare({ title, description }) {
      return {
        title: title || "No title",
        subtitle: `Hero slide: ${description || "No description"}`,
      };
    },
  },
});
