import { copy, services } from "@/content/business";

export function Services({ onEnquire }: { onEnquire: (id: string) => void }) {
  const main = services.filter((s) => s.group === "main");
  const specialist = services.filter((s) => s.group === "specialist");
  return (
    <section id="services" className="py-20">
      <div className="container-site">
        <p className="eyebrow">Services</p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">{copy.servicesTitle}</h2>
        <ol className="mt-10 divide-y border-y">
          {main.map((s, i) => (
            <li key={s.id} className="grid gap-3 py-7 md:grid-cols-[4rem_1fr_2fr_auto] md:items-start md:gap-8">
              <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-muted-foreground">{s.body}</p>
              <EnquireBtn onClick={() => onEnquire(s.id)} label={s.title} />
            </li>
          ))}
        </ol>
        <h3 className="mt-14 text-lg font-semibold">{copy.additionalTitle}</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {specialist.map((s) => (
            <div key={s.id} className="flex flex-col rounded-md border bg-card p-6">
              <h4 className="font-display text-lg font-semibold">{s.title}</h4>
              <p className="mt-2 flex-1 text-[0.98rem] text-muted-foreground">{s.body}</p>
              <div className="mt-5"><EnquireBtn onClick={() => onEnquire(s.id)} label={s.title} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnquireBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className="btn btn-outline min-h-11 text-sm" aria-label={`Enquire about ${label}`}>
      Enquire about this
    </button>
  );
}
