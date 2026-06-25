import Link from "next/link";
import { navItems, siteConfig } from "@/data/site";
import { defaultReservationUrl } from "@/lib/links";
import { CtaButton } from "@/components/ui/cta-button";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Principal">
        <Link href="/#inicio" className="group flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full border border-neon-red/50 bg-neon-red/10 text-lg font-black text-neon-red shadow-[0_0_24px_rgba(229,9,47,0.32)]">
            T
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.24em] text-cream">{siteConfig.shortName}</span>
            <span className="block text-xs text-soft-gold">{siteConfig.tagline}</span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-semibold text-white/68 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden sm:block">
          <CtaButton href={defaultReservationUrl} className="min-h-10 px-5 text-xs">
            Reservar
          </CtaButton>
        </div>
      </nav>
    </header>
  );
}
