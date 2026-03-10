export const product = {
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
    },
    {
      name: "presentations",
      title: "Presentaciones",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "size", title: "Tamaño", type: "string" },
            { name: "price", title: "Precio (MXN sin IVA)", type: "number" },
            { name: "sku", title: "SKU", type: "string" },
            { name: "stock", title: "Stock", type: "number" },
          ],
        },
      ],
    },
    {
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
        },
      ],
    },
    {
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "technicalSheet",
      title: "Ficha Técnica (URL PDF)",
      type: "url",
    },
    {
      name: "safetySheet",
      title: "Hoja de Seguridad (URL PDF)",
      type: "url",
    },
    {
      name: "videoUrl",
      title: "URL Video (YouTube/Vimeo)",
      type: "url",
    },
    {
      name: "isFeatured",
      title: "Producto Destacado",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "rating",
      title: "Calificación Promedio",
      type: "number",
      initialValue: 0,
    },
    {
      name: "reviewCount",
      title: "Número de Reseñas",
      type: "number",
      initialValue: 0,
    },
    {
      name: "useCase",
      title: "Usos",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Hogar", value: "hogar" },
          { title: "Industrial", value: "industrial" },
          { title: "Automotriz", value: "automotriz" },
          { title: "Cosmética", value: "cosmetica" },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0",
      category: "category.name",
    },
    prepare({ title, media, category }: any) {
      return { title, subtitle: category, media };
    },
  },
};
