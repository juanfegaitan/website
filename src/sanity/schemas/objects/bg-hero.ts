// bg hero, receive bg image or video. title, subtitle

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { defineField, defineType } from "sanity";
import { TextAlign } from "../components/text-align";

export default defineType({
  type: "object",
  name: "bgHero",
  title: "Background Hero",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "bgVideo",
      title: "Background Video",
      type: "file",
      // validate file type to be mp4
      options: {
        accept: "video/mp4",
      },
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
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
      name: "bg",
      title: "Background",
      type: "image",
    }),
    // Bg Image mobile
    defineField({
      name: "bgMobile",
      title: "Background Mobile",
      type: "image",
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
    },
    prepare({ title }) {
      return {
        subtitle: "Course Hero",
        title,
      };
    },
  },
});
