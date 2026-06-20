import { navItems, siteConfig } from "@/data/site";
import { defaultReservationUrl } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-black text-cream">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/62">
            Gastronomia, cocteleria, karaoke, DJ y celebraciones en Alto Hospicio. La carta digital sigue disponible en Fudo.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-soft-gold">Explorar</p>
          <div className="grid gap-2 text-sm text-white/68">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
            <a href={siteConfig.fudoMenuUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
              Carta Fudo
            </a>
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-soft-gold">Contacto</p>
          <div className="grid gap-2 text-sm text-white/68">
            <a href={defaultReservationUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
              WhatsApp {siteConfig.displayPhone}
            </a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
              Instagram @terracielogastrobar
            </a>
            <span>{siteConfig.address.street}, {siteConfig.address.city}</span>
            <a href="#politicas" className="transition hover:text-white">Politicas de reserva y privacidad</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
        <p>Web preparada para SEO local, reservas y futuras integraciones.</p>
      </div>
    </footer>
  );
}
