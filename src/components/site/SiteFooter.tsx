import { business } from "@/content/business";

export function SiteFooter() {
  return (
    <footer className="bg-graphite pb-28 pt-14 text-silver md:pb-14">
      <div className="container-site grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-ivory">{business.name}</p>
          <p className="mt-2 text-sm">{business.locationLine}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-ivory">Contact</p>
          <p className="mt-2"><a className="underline" href={business.phoneHref}>{business.phoneDisplay}</a></p>
          {business.facebook && <p className="mt-1"><a className="underline" href={business.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>{business.instagram && <> · <a className="underline" href={business.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></>}</p>}
          {business.email && <p className="mt-1 break-words"><a className="underline" href={`mailto:${business.email}`}>{business.email}</a></p>}
          {business.whatsappBase && <p className="mt-1"><a className="underline" href={business.whatsappBase} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>}
        </div>
        <div className="text-sm">
          <p className="font-semibold text-ivory">Based in {business.base}</p>
          <p className="mt-2">{business.region}, {business.country}</p>
          <p className="mt-2">Get in touch to discuss the work and arrange a suitable time.</p>
        </div>
      </div>
      <p className="container-site mt-10 border-t border-graphite-soft pt-6 text-sm">
        Website concept demo prepared for {business.name} by {business.demoBy}. Not commissioned or approved by the business. Details from {business.source.label}, checked {business.source.checked}.
      </p>
    </footer>
  );
}

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-graphite-soft bg-graphite p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a href="#enquire" className="btn btn-primary">Enquire</a>
      <a href={business.phoneHref} className="btn btn-outline-light">Call {business.callName}</a>
    </div>
  );
}
