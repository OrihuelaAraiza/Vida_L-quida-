/**
 * Catálogo estático de productos Vida Líquida.
 * Imágenes: /public/images/banners/<slug>.webp
 * Actualizar precios aquí cuando cambien.
 */
import type { Product } from "@/types";

export interface Presentacion {
  volumen: string;
  precio: number;
  nota?: string;
}

export interface Producto {
  slug: string;
  nombre: string;
  categoria: "hogar" | "industrial" | "automotriz" | "cosmetica" | "desinfeccion";
  descripcion: string;
  beneficios: string[];
  presentaciones: Presentacion[];
  /** Color temático del banner (para fallback sin imagen) */
  colorBanner: string;
  colorTexto: string;
  certificaciones?: string[];
  nota?: string;
  /** Ruta relativa desde /public */
  banner: string;
  ecoAmigable: boolean;
  buap: boolean;
}

export const PRODUCTOS: Producto[] = [
  {
    slug: "espuma-limpiadora-facial",
    nombre: "Espuma Limpiadora Facial",
    categoria: "cosmetica",
    descripcion: "Desmaquilla y limpia al mismo tiempo tu rostro. Formulada con extracto de hamamelis y sábila.",
    beneficios: ["Desmaquilla y limpia al mismo tiempo tu rostro"],
    presentaciones: [
      { volumen: "Espuma 50ml", precio: 55.0 },
      { volumen: "Rellenapack 500ml", precio: 218.44 },
    ],
    colorBanner: "#E91E8C",
    colorTexto: "#ffffff",
    banner: "/images/banners/espuma-limpiadora-facial.webp",
    ecoAmigable: false,
    buap: false,
  },
  {
    slug: "multilimpiador",
    nombre: "Multilimpiador",
    categoria: "hogar",
    descripcion: "Desengrasante y multilimpiador sin sustancias tóxicas. Certificado BUAP en desinfección y no irritabilidad.",
    beneficios: ["Desengrasa", "Limpia", "Desinfecta"],
    presentaciones: [
      { volumen: "500ml", precio: 51.4, nota: "No incluye atomizador" },
      { volumen: "1L", precio: 91.2, nota: "No incluye atomizador" },
      { volumen: "4L", precio: 341.6 },
      { volumen: "20L", precio: 1592.0 },
    ],
    colorBanner: "#2E7D2E",
    colorTexto: "#ffffff",
    certificaciones: ["BUAP"],
    nota: "Estos precios no incluyen atomizador",
    banner: "/images/banners/multilimpiador.webp",
    ecoAmigable: true,
    buap: true,
  },
  {
    slug: "limpia-vidrios",
    nombre: "Limpia Vidrios",
    categoria: "hogar",
    descripcion: "Acabado tipo espejo. Con 3 disparos cubres 1 m² (4.5 ml). Retira con microfibra ¡y listo!",
    beneficios: ["Acabado tipo espejo", "Degrada suciedad", "Elimina grasa"],
    presentaciones: [
      { volumen: "500ml", precio: 63.0, nota: "No incluye atomizador" },
      { volumen: "1L", precio: 108.6, nota: "No incluye atomizador" },
      { volumen: "4L", precio: 411.2 },
      { volumen: "20L", precio: 1940.0 },
    ],
    colorBanner: "#7B5EA7",
    colorTexto: "#ffffff",
    nota: "Estos precios no incluyen atomizador",
    banner: "/images/banners/limpia-vidrios.webp",
    ecoAmigable: true,
    buap: false,
  },
  {
    slug: "quita-sarro",
    nombre: "Quita Sarro",
    categoria: "hogar",
    descripcion: "Erradicador de sarros blancos. Fácil aplicación en canceles de regadera, grifos, tarjas de cocina, paredes y pisos.",
    beneficios: ["Elimina sarro en diferentes superficies"],
    presentaciones: [
      { volumen: "500ml", precio: 68.8, nota: "No incluye atomizador" },
      { volumen: "1L", precio: 126.0, nota: "No incluye atomizador" },
      { volumen: "4L", precio: 481.8 },
      { volumen: "20L", precio: 2288.0 },
    ],
    colorBanner: "#1565C0",
    colorTexto: "#ffffff",
    nota: "Estos precios no incluyen atomizador",
    banner: "/images/banners/quita-sarro.webp",
    ecoAmigable: true,
    buap: false,
  },
  {
    slug: "desinfectante-de-cobre",
    nombre: "Desinfectante de Cobre",
    categoria: "desinfeccion",
    descripcion: "Elimina bacterias, virus, hongos y algas. Certificado BUAP en desinfección y no irritabilidad.",
    beneficios: ["Elimina bacterias, virus, hongos y algas"],
    presentaciones: [
      { volumen: "250ml", precio: 45.6 },
      { volumen: "1L", precio: 160.0 },
      { volumen: "4L", precio: 620.0 },
      { volumen: "20L", precio: 2984.0 },
    ],
    colorBanner: "#E65100",
    colorTexto: "#ffffff",
    certificaciones: ["BUAP"],
    banner: "/images/banners/desinfectante-de-cobre.webp",
    ecoAmigable: true,
    buap: true,
  },
  {
    slug: "desinfectante-cobre-frutas-verduras",
    nombre: "Desinfectante de Cobre para Frutas y Verduras",
    categoria: "desinfeccion",
    descripcion: "Desinfectante de cobre especialmente formulado para frutas y verduras. Certificado BUAP.",
    beneficios: ["Elimina bacterias, virus, hongos y algas", "Seguro para alimentos"],
    presentaciones: [
      { volumen: "250ml", precio: 45.6 },
      { volumen: "1L", precio: 160.8 },
      { volumen: "4L", precio: 620.0 },
    ],
    colorBanner: "#EF6C00",
    colorTexto: "#ffffff",
    certificaciones: ["BUAP"],
    banner: "/images/banners/desinfectante-cobre-frutas-verduras.webp",
    ecoAmigable: true,
    buap: true,
  },
  {
    slug: "limpia-lentes-celulares",
    nombre: "Limpia Lentes y Celulares",
    categoria: "hogar",
    descripcion: "Limpiador especializado para lentes ópticos y pantallas de celular. Sin sustancias tóxicas.",
    beneficios: ["Limpia lentes sin rayar", "Elimina huellas y grasa"],
    presentaciones: [
      { volumen: "30ml", precio: 28.2 },
    ],
    colorBanner: "#4DC8E8",
    colorTexto: "#1A1A6E",
    banner: "/images/banners/limpia-lentes-celulares.webp",
    ecoAmigable: true,
    buap: false,
  },
  {
    slug: "limpiador-desinfectante-manos",
    nombre: "Limpiador y Desinfectante de Manos",
    categoria: "desinfeccion",
    descripcion: "Libre de enjuague, degrada grasa y mugre, sin alcohol. Certificado BUAP en desinfección y no irritabilidad.",
    beneficios: ["Libre de enjuague", "Degrada grasa y mugre", "Sin alcohol"],
    presentaciones: [
      { volumen: "Espuma 50ml", precio: 55.0 },
      { volumen: "Spray 60ml", precio: 34.0 },
      { volumen: "Spray 120ml", precio: 57.0 },
      { volumen: "1L Rellenapack", precio: 97.0 },
      { volumen: "4L Rellenapack", precio: 364.8 },
      { volumen: "20L Rellenapack", precio: 1708.0 },
    ],
    colorBanner: "#00897B",
    colorTexto: "#ffffff",
    certificaciones: ["BUAP"],
    banner: "/images/banners/limpiador-desinfectante-manos.webp",
    ecoAmigable: true,
    buap: true,
  },
  {
    slug: "lavado-autos-waterless",
    nombre: "Lavado de Autos Waterless",
    categoria: "automotriz",
    descripcion: "1 litro es suficiente para lavar hasta 10 autos. Lava, encera, protege y elimina grasa sin agua.",
    beneficios: ["Lava", "Encera", "Protege", "Elimina grasa"],
    presentaciones: [
      { volumen: "500ml", precio: 86.2, nota: "No incluye atomizador" },
      { volumen: "1L", precio: 160.8, nota: "No incluye atomizador" },
      { volumen: "4L", precio: 620.0 },
      { volumen: "20L", precio: 2984.0 },
    ],
    colorBanner: "#C62828",
    colorTexto: "#ffffff",
    nota: "Estos precios no incluyen atomizador",
    banner: "/images/banners/lavado-autos-waterless.webp",
    ecoAmigable: true,
    buap: false,
  },
  {
    slug: "desengrasante-alcalino",
    nombre: "Desengrasante Alcalino",
    categoria: "industrial",
    descripcion: "Potencia limpiadora para aceite y grasa industrial. Sin sustancias tóxicas.",
    beneficios: ["Limpia", "Desengrasa"],
    presentaciones: [
      { volumen: "500ml", precio: 63.0, nota: "No incluye atomizador" },
      { volumen: "1L", precio: 114.0, nota: "No incluye atomizador" },
      { volumen: "4L", precio: 434.0 },
      { volumen: "20L", precio: 2056.0 },
    ],
    colorBanner: "#F9A825",
    colorTexto: "#1A1A6E",
    nota: "Estos precios no incluyen atomizador",
    banner: "/images/banners/desengrasante-alcalino.webp",
    ecoAmigable: true,
    buap: false,
  },
  {
    slug: "quitamachas-pisos-paredes",
    nombre: "Quitamachas en Pisos y Paredes",
    categoria: "hogar",
    descripcion: "Elimina suciedad, remueve óxido y quita pegamento en pisos y paredes.",
    beneficios: ["Elimina suciedad", "Remueve óxido", "Quita pegamento"],
    presentaciones: [
      { volumen: "500ml", precio: 63.0, nota: "No incluye atomizador" },
      { volumen: "1L", precio: 114.0, nota: "No incluye atomizador" },
      { volumen: "4L", precio: 434.0 },
      { volumen: "20L", precio: 2056.0 },
    ],
    colorBanner: "#CDDC39",
    colorTexto: "#1A1A6E",
    nota: "Estos precios no incluyen atomizador",
    banner: "/images/banners/quitamachas-pisos-paredes.webp",
    ecoAmigable: true,
    buap: false,
  },
  {
    slug: "quitamanchas-organico-telas",
    nombre: "Quitamanchas Orgánico en Telas",
    categoria: "hogar",
    descripcion: "Degrada manchas de origen orgánico. Formulado con enzimas para telas delicadas.",
    beneficios: ["Degrada manchas origen orgánico", "Formulado con enzimas"],
    presentaciones: [
      { volumen: "Spray 30ml", precio: 57.2 },
    ],
    colorBanner: "#C62828",
    colorTexto: "#ffffff",
    banner: "/images/banners/quitamanchas-organico-telas.webp",
    ecoAmigable: true,
    buap: false,
  },
  {
    slug: "eliminador-olores-citricos",
    nombre: "Eliminador Orgánico de Olores Aroma Cítricos",
    categoria: "hogar",
    descripcion: "Degrada la fuente del mal olor sin enmascararlo. Aroma cítrico fresco.",
    beneficios: ["Degrada la fuente del mal olor", "Sin enmascarar el olor"],
    presentaciones: [
      { volumen: "Spray 60ml", precio: 39.8 },
      { volumen: "500ml", precio: 103.6, nota: "No incluye atomizador" },
      { volumen: "1L", precio: 195.0, nota: "No incluye atomizador" },
      { volumen: "4L", precio: 759.2 },
      { volumen: "20L", precio: 3680.0 },
    ],
    colorBanner: "#EF6C00",
    colorTexto: "#ffffff",
    nota: "Estos precios no incluyen atomizador",
    banner: "/images/banners/eliminador-olores-citricos.webp",
    ecoAmigable: true,
    buap: false,
  },
  {
    slug: "eliminador-olores-kiwi",
    nombre: "Eliminador Orgánico de Olores Aroma Kiwi",
    categoria: "hogar",
    descripcion: "Degrada la fuente del mal olor sin enmascararlo. Aroma kiwi refrescante.",
    beneficios: ["Degrada la fuente del mal olor", "No enmascara el olor"],
    presentaciones: [
      { volumen: "Spray 60ml", precio: 39.8 },
      { volumen: "500ml", precio: 103.6, nota: "No incluye atomizador" },
      { volumen: "1L", precio: 195.0, nota: "No incluye atomizador" },
      { volumen: "4L", precio: 759.2 },
      { volumen: "20L", precio: 3680.0 },
    ],
    colorBanner: "#7B1FA2",
    colorTexto: "#ffffff",
    nota: "Estos precios no incluyen atomizador",
    banner: "/images/banners/eliminador-olores-kiwi.webp",
    ecoAmigable: true,
    buap: false,
  },
  {
    slug: "destapa-canos-organico",
    nombre: "Destapa Caños Orgánico",
    categoria: "hogar",
    descripcion: "Deshace papel de baño, evita taponamientos y deodoriza tuberías.",
    beneficios: ["Deshace papel de baño", "Evita taponamientos", "Deodoriza"],
    presentaciones: [
      { volumen: "500ml", precio: 103.6 },
      { volumen: "1L", precio: 195.6 },
      { volumen: "4L", precio: 759.2 },
      { volumen: "20L", precio: 3680.0 },
    ],
    colorBanner: "#1A1A6E",
    colorTexto: "#ffffff",
    banner: "/images/banners/destapa-canos-organico.webp",
    ecoAmigable: true,
    buap: false,
  },
];

export const getPrecioDesde = (p: Producto): number =>
  Math.min(...p.presentaciones.map((pr) => pr.precio));

export const getPorCategoria = (cat: Producto["categoria"]) =>
  PRODUCTOS.filter((p) => p.categoria === cat);

/** Convierte el catálogo estático al formato Product que espera ProductGrid/ProductCard */
export function toProductType(p: Producto): Product {
  return {
    _id: `static-${p.slug}`,
    name: p.nombre,
    slug: p.slug,
    description: p.descripcion,
    presentations: p.presentaciones.map((pr) => ({
      size: pr.volumen,
      price: pr.precio,
    })),
    images: [],
    _staticImageUrl: p.banner,
    category: {
      _id: `cat-${p.categoria}`,
      name: {
        hogar: "Hogar",
        industrial: "Industrial",
        automotriz: "Automotriz",
        cosmetica: "Cosmética",
        desinfeccion: "Desinfección",
      }[p.categoria] ?? p.categoria,
      slug: p.categoria,
    },
    isFeatured: false,
    isBestseller: p.buap,
    rating: 5,
    reviewCount: 0,
    useCase: p.beneficios,
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-01T00:00:00Z",
  };
}

export const STATIC_PRODUCTS: Product[] = PRODUCTOS.map(toProductType);
