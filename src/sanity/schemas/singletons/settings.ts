import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CogIcon,
} from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { TextAlign } from "../components/text-align";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    // title navbar
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of your site.",
    }),
    // Define logo field
    defineField({
      name: "logo",
      title: "Logo",
      type: "customImage",
      description: "The logo of your site.",
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media",
      description: "Social media links displayed on your site.",
      type: "array",
      of: [
        {
          title: "Social Media",
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                ],
              },
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "privacyPolicy",
      title: "Privacy Policy",
      description: "The privacy policy of your site.",
      type: "reference",
      to: [
        {
          type: "page",
        },
      ],
    }),
    defineField({
      name: "footer",
      description:
        "This is a block of text that will be displayed at the bottom of the page.",
      title: "Footer Info",
      type: "array",
      of: [
        defineArrayMember({
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
        }),
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      description: "The address of your site.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "The email of your site.",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description: "The phone number of your site.",
    }),
    // color theme
    defineField({
      name: "theme",
      title: "Theme",
      type: "color",
      description: "The color theme of your site.",
      options: {
        disableAlpha: true,
      },
    }),
    // define contact cta
    defineField({
      name: "contactCta",
      title: "Contact CTA",
      description: "The text displayed on the contact CTA.",
      type: "cta",
    }),
    defineField({
      name: "menuItems",
      title: "Menu Item list",
      description: "Links displayed on the header of your site.",
      type: "array",
      of: [
        {
          title: "Reference",
          type: "reference",
          to: [
            {
              type: "home",
            },
            {
              type: "page",
            },
            {
              type: "about",
            },
            {
              type: "course",
            },
            {
              type: "resources",
            },
            {
              type: "blog",
            },
            {
              type: "invest",
            },
            {
              type: "service",
            },
            {
              type: "services",
            },
            {
              type: "marketPage",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "gtm",
      title: "Tag Manager",
      type: "string",
      description: "The tag manager gtm id.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "SEO settings default for all pages.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Menu Items",
      };
    },
  },
});
