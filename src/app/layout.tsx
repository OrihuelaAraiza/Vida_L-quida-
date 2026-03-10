import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchBar } from "@/components/shared/SearchBar";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://vidaliquida.mx"),
  title: {
    default: "Vida Líquida — Productos de Limpieza Orgánicos",
    template: "%s | Vida Líquida",
  },
  description: "Productos de limpieza biodegradables, sin vapores tóxicos, certificados COFEPRIS y avalados por la BUAP. Envío a todo México.",
  keywords: ["limpieza orgánica", "biodegradable", "COFEPRIS", "Puebla", "sin tóxicos"],
  authors: [{ name: "Vida Líquida", url: "https://vidaliquida.mx" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://vidaliquida.mx",
    siteName: "Vida Líquida",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body>
        <a href="#main-content" className="skip-nav">
          Saltar al contenido principal
        </a>
        <Providers>
          <Header />
          <main id="main-content" className="min-h-screen pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <CartDrawer />
          <SearchBar />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
