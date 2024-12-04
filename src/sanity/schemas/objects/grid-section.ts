// create allied section schema with title(optional), description(optional), and list of allieds image

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { defineField, defineType } from "sanity";
import { TextAlign } from "../components/text-align";

export default defineType({
  name: "gridSection",
  title: "Grid section",
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
      name: "grids",
      title: "Grids",
      description: "Grids of images, title, and description",
      type: "array",
      of: [
        {
          type: "grid",
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
        subtitle: "Grid section",
      };
    },
  },
});
