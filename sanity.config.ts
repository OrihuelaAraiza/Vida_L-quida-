import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/lib/sanity/schemas";
import { projectId, dataset } from "./src/lib/sanity/client";

export default defineConfig({
  name: "vida-liquida-studio",
  title: "Vida Líquida Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem().title("Productos").schemaType("product").child(S.documentTypeList("product")),
            S.listItem().title("Categorías").schemaType("category").child(S.documentTypeList("category")),
            S.listItem().title("Reseñas").schemaType("review").child(S.documentTypeList("review")),
            S.listItem().title("Blog").schemaType("post").child(S.documentTypeList("post")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
