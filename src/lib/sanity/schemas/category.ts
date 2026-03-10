export const category = {
  name: "category",
  title: "Categoría",
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
      name: "icon",
      title: "Icono (emoji o nombre)",
      type: "string",
    },
    {
      name: "description",
      title: "Descripción",
      type: "text",
    },
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
};
