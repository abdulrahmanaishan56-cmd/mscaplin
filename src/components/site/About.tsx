import { business, copy, faqs, processSteps, reviews, workImages } from "@/content/business";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function AboutBusiness() {
  const img = workImages[copy.aboutIndex]!;
  return (
    <section id="about" className="bg-graphite py-20 text-ivory">
      <div className="container-site grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <figure className="max-w-[380px]">
          <img src={img.src} alt={img.alt} width={800} height={800} loading="lazy" className="aspect-square w-full rounded-md object-cover" />
          <figcaption className="mt-3 text-sm text-silver">{img.caption}</figcaption>
        </figure>
        <div>
          <p className="on-dark-eyebrow">About</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{copy.aboutTitle}</h2>
          <p className="mt-5 max-w-xl text-silver">
            {copy.aboutBody}
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {copy.aboutPoints.map((point) => (
              <li key={point.title} className="border-l-2 border-copper pl-4">
                <h3 className="text-lg font-semibold">{point.title}</h3>
                <p className="mt-1 text-silver">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ReviewSection() {
  return (
    <section id="reviews" className="py-20">
      <div className="container-site">
        <p className="eyebrow">Reviews</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What customers wrote</h2>
        <p className="mt-3 text-muted-foreground">{copy.reviewIntro}</p>
        <ul className={`mt-10 grid gap-5 ${reviews.length >= 3 ? "md:grid-cols-3" : reviews.length === 2 ? "md:grid-cols-2" : "max-w-2xl"}`}>
          {reviews.map((r) => (
            <li key={r.author} className="flex flex-col rounded-md border bg-card p-6">
              <p className="font-semibold text-copper-deep" aria-label={r.ratingLabel}>{r.ratingLabel === "5/5" ? "★★★★★ · 5/5" : r.ratingLabel}</p>
              <blockquote className="mt-3 flex-1 font-display text-xl font-medium">"{r.quote}"</blockquote>
              <p className="mt-5 break-words text-sm">
                <span className="font-semibold">{r.author}</span>
                <span className="text-muted-foreground"> · {r.date} · Excerpt</span>
              </p>
              <a href={r.source} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm text-primary underline underline-offset-4">
                Read on {business.source.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  const steps = processSteps;
  return (
    <section className="border-y bg-card py-16" aria-labelledby="process-h">
      <div className="container-site">
        <h2 id="process-h" className="text-2xl font-bold">How an enquiry works</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t}>
              <span className="font-display text-sm font-semibold text-copper-deep">Step {i + 1}</span>
              <h3 className="mt-1 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-muted-foreground">{s.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="py-20" aria-labelledby="faq-h">
      <div className="container-site max-w-3xl">
        <h2 id="faq-h" className="text-3xl font-bold">Questions</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
