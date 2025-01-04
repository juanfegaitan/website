// define schema type for property name, slug, price, occupancy, gallery, average rent, and description portable text, capital gains of the area, characteristics, and location, similar properties, kind of department

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { defineType } from "sanity";
import { TextAlign } from "../components/text-align";

export default defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 200,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "price",
      title: "Precio",
      type: "number",
      validation: (rule) => rule.required(),
    },
    {
      name: "currency",
      title: "Moneda",
      type: "string",
      validation: (rule) => rule.required(),
    },
    // kind of property house, apartment, etc
    {
      name: "kindOfProperty",
      title: "Tipo de propiedad",
      type: "string",
      validation: (rule) => rule.required(),
      placeholder: "Tipo de propiedad",
      initialValue: ["apartment"],
      options: {
        list: [
          { title: "Casa", value: "house" },
          { title: "Departamento", value: "apartment" },
        ],
      },
    },
    // Agregar tiempo de construcción y Velocidad de renta a las casas de estados unidos. (debe verse en la card)
    {
      name: "constructionTime",
      title: "Tiempo de construcción",
      type: "string",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.kindOfProperty === "house" && !value) {
            return "Este campo es requerido para propiedades tipo casa";
          }
          return true;
        }),
      hidden: ({ document }) => document?.kindOfProperty !== "house",
    },
    {
      name: "rentSpeed",
      title: "Velocidad de renta",
      type: "string",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.kindOfProperty === "house" && !value) {
            return "Este campo es requerido para propiedades tipo casa";
          }
          return true;
        }),
      hidden: ({ document }) => document?.kindOfProperty !== "house",
    },
    {
      // appreciation
      name: "appreciation",
      title: "Plusvalía proyectada",
      type: "number",
      validation: (rule) => rule.required(),
    },
    // Proyección anual
    {
      name: "annualProjection",
      title: "Proyección anual",
      type: "number",
      validation: (rule) => rule.required(),
    },
    {
      name: "highlight",
      title: "Destacado",
      type: "boolean",
    },
    {
      name: "highlightText",
      title: "Texto destacado",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "deliveryDate",
      title: "Fecha de entrega",
      type: "date",
      validation: (rule) => rule.required(),
    },
    {
      name: "occupancy",
      title: "Ocupación zona",
      type: "number",
      validation: (rule) => rule.required().max(100).min(0),
    },
    {
      name: "gallery",
      title: "Galería de imágenes",
      type: "gallery",
      validation: (rule) => rule.required(),
    },
    {
      name: "averageRent",
      title: "Renta promedio",
      type: "number",
      validation: (rule) => rule.required(),
    },
    {
      name: "description",
      title: "Descripción",
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
      validation: (rule) => rule.required(),
    },
    {
      name: "characteristics",
      title: "Características",
      type: "array",
      of: [
        {
          type: "projectCharacteristics",
        },
      ],
      validation: (rule) => rule.required(),
    },
    {
      name: "location",
      title: "Ubicación",
      type: "projectLocation",
      validation: (rule) => rule.required(),
    },
    {
      name: "similarProperties",
      title: "Propiedades similares",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "property",
            },
          ],
        },
      ],
    },
    {
      name: "kindOfDepartments",
      title: "Tipos de departamento",
      type: "array",
      of: [
        {
          type: "kindOfDepartment",
        },
      ],
      validation: (rule) => rule.required(),
    },
    // seo
    {
      name: "seo",
      title: "SEO",
      type: "seo",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "gallery.images.0",
    },
    prepare({ title, media }) {
      return {
        media,
        title: title || "No title",
      };
    },
  },
});
