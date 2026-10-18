import { useState } from "react";
import { Menu, X } from "lucide-react";
import { business } from "@/content/business";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Our work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-graphite-soft bg-graphite text-ivory">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-ivory focus:px-3 focus:py-2 focus:text-graphite">
        Skip to content
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <a href="#top" className="max-w-[75%] font-display text-base font-bold leading-tight tracking-tight md:max-w-[40%] md:text-lg">
          {business.name}
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-silver hover:text-ivory">{n.label}</a>
          ))}
          <a href="#enquire" className="btn btn-primary">Request a quote</a>
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-graphite-soft md:hidden">
          <ul className="container-site flex flex-col py-3">
            {[...nav, { href: "#enquire", label: "Enquire" }].map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block py-3 text-base">{n.label}</a>
              </li>
            ))}
            <li><a href={business.phoneHref} className="block py-3 text-silver">Call {business.phoneDisplay}</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
