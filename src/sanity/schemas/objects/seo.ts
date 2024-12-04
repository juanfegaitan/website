import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { TextAlign } from "../components/text-align";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  description: "SEO settings for this page",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Used for the <title> tag and the personal website header.",
    }),
    defineField({
      name: "description",
      description:
        "Used both for the <meta> description tag for SEO, and the personal website subheader.",
      title: "Description",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
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
              {
                title: "Italic",
                value: "em",
              },
              {
                title: "Strong",
                value: "strong",
              },
            ],
          },
          styles: [],
          type: "block",
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: "image",
      title: "Open Graph Image",
      type: "image",
      description: "Displayed on social cards and search engine results.",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No title",
      };
    },
  },
});
