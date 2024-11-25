// define schema type for property name, slug, price, occupancy, gallery, average rent, and description portable text, capital gains of the area, characteristics, and location, similar properties, kind of department

import { defineType } from "sanity";

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
