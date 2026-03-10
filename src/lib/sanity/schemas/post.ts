export const post = {
  name: "post",
  title: "Blog",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string", validation: (Rule: any) => Rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    { name: "excerpt", title: "Resumen", type: "text", rows: 3 },
    { name: "body", title: "Contenido", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] },
    {
      name: "coverImage",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    },
    { name: "author", title: "Autor", type: "string" },
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
};
