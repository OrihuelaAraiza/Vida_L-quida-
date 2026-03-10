export const review = {
  name: "review",
  title: "Reseña",
  type: "document",
  fields: [
    {
      name: "product",
      title: "Producto",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "author",
      title: "Autor",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "rating",
      title: "Calificación",
      type: "number",
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: "body",
      title: "Reseña",
      type: "text",
      rows: 4,
    },
    {
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "verified",
      title: "Compra verificada",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: { title: "author", subtitle: "rating" },
    prepare({ title, subtitle }: any) {
      return { title, subtitle: `${subtitle} estrellas` };
    },
  },
};
