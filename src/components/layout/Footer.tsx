import Link from "next/link";
import { Container } from "./Container";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, Linkedin, Search } from "lucide-react";

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
    { label: "Distribuidores", href: "/distribuidores" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "mailto:hola@vidaliquida.mx" },
  ],
  legal: [
    { label: "Política de privacidad", href: "/politica-privacidad" },
    { label: "Términos y condiciones", href: "/terminos" },
  ],
};

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/p/B6ENznppTZ4/?igshid=1q4n30mpjvfxc",
    Icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Vidaliquidalimpiezasinagua",
    Icon: Facebook,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCSi_SMNltB2HAHX7uhtV84A?view_as=subscriber",
    Icon: Youtube,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vida-liquida/",
    Icon: Linkedin,
  },
  {
    label: "Google",
    href: "https://www.google.com.mx/search?q=VIDA+LIQUIDA+LIMPIEZA+PROFESIONAL+LIBRE+DE+ENJUAGUE&ludocid=13490171752195838783&lsig=AB86z5VAj5W3B46aPnGLibTu0jI3#lkt=LocalPoiPhotos",
    Icon: Search,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[rgba(26,26,110,0.12)] text-white mt-20" style={{ background: "#1A1A6E" }}>
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, #5B00B5, #7B20D5)" }}>
                <span className="text-white font-bold text-sm">VL</span>
              </div>
              <span className="font-display text-xl tracking-widest">
                <span style={{ color: "#4DC8E8" }}>VIDA</span>{" "}
                <span style={{ color: "#80CC28" }}>LÍQUIDA</span>
              </span>
            </div>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              Productos de limpieza orgánicos, biodegradables y sin vapores tóxicos. Certificados por COFEPRIS y avalados por la BUAP.
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/60 hover:text-white transition-colors h-[44px] w-[44px] flex items-center justify-center rounded-lg hover:bg-white/10"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
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
                <MapPin className="h-4 w-4 shrink-0 text-[#4DC8E8]" />
                Puebla, México
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#4DC8E8]" />
                <a href="tel:+522221234567" className="hover:text-white transition-colors">222 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#4DC8E8]" />
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
