// prokect location with geopoint, country, state, city, address, and map

import { defineType } from "sanity";

export default defineType({
  name: "projectLocation",
  title: "Project Location",
  type: "object",
  fields: [
    {
      name: "geopoint",
      title: "Geopoint",
      type: "geopoint",
      validation: (rule) => rule.required(),
    },
    {
      name: "country",
      title: "Country",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "state",
      title: "State",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "map",
      title: "Map",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["palette", "lqip"],
      },
    },
  ],
  preview: {
    select: {
      title: "address",
      subtitle: "state",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "No address",
        subtitle: subtitle || "No city",
      };
    },
  },
});
