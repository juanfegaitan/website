// create youtube section object title, description CustomPortableText, url

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { TextAlign } from "../components/text-align";

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
