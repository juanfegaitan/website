// create a feature section fields description portable text, title, image, position left or right

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { TextAlign } from "../components/text-align";

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
