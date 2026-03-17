import Link from "next/link";
import { Container } from "./Container";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

const navLinks = {
  tienda: [
    { label: "Todos los productos", href: "/productos" },
    { label: "Hogar", href: "/productos?categoria=hogar" },
    { label: "Industrial", href: "/productos?categoria=industrial" },
    { label: "Automotriz", href: "/productos?categoria=automotriz" },
    { label: "Cosmética", href: "/productos?categoria=cosmetica" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "mailto:hola@vidaliquida.mx" },
  ],
  legal: [
    { label: "Política de privacidad", href: "/politica-privacidad" },
    { label: "Términos y condiciones", href: "/terminos" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[rgba(0,194,240,0.12)] bg-[#071A2E] text-white mt-20">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, #00C2F0, #0088CC)" }}>
                <span className="text-white font-bold text-sm">VL</span>
              </div>
              <span className="font-display text-xl tracking-widest">
                <span style={{ color: "#00C2F0" }}>VIDA</span>{" "}
                <span style={{ color: "#39D353" }}>LÍQUIDA</span>
              </span>
            </div>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              Productos de limpieza orgánicos, biodegradables y sin vapores tóxicos. Certificados por COFEPRIS y avalados por la BUAP.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/vidaliquida" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/vidaliquida" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/60 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/@vidaliquida" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/60 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tienda */}
          <nav aria-label="Links de tienda">
            <h3 className="font-semibold mb-4 text-white">Tienda</h3>
            <ul className="space-y-2">
              {navLinks.tienda.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Empresa */}
          <nav aria-label="Links de empresa">
            <h3 className="font-semibold mb-4 text-white">Empresa</h3>
            <ul className="space-y-2">
              {navLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
                Puebla, México
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
                <a href="tel:+522221234567" className="hover:text-white transition-colors">222 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
                <a href="mailto:hola@vidaliquida.mx" className="hover:text-white transition-colors">hola@vidaliquida.mx</a>
              </li>
            </ul>

            {/* Certifications */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded border border-white/20 text-white/60">COFEPRIS</span>
              <span className="text-xs px-2 py-1 rounded border border-white/20 text-white/60">Aval BUAP</span>
              <span className="text-xs px-2 py-1 rounded border border-white/20 text-white/60">ISO 14001</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Vida Líquida. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            {navLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white/80 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
