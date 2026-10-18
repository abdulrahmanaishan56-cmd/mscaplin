import { MapPin, Phone, MessageCircle } from "lucide-react";
import { business, copy, heroImage } from "@/content/business";

export function Hero() {
  return (
    <section id="top" className="bg-graphite text-ivory">
      <div className="container-site grid items-center gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <div>
          <p className="on-dark-eyebrow">{business.locationLine}</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg text-silver">
            {copy.heroBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#enquire" className="btn btn-primary">Request a quote</a>
            <a href={business.phoneHref} className="btn btn-outline-light"><Phone className="h-4 w-4" aria-hidden />Call {business.callName}</a>
          </div>
          <a href="#work" className="mt-5 inline-block text-sm text-silver underline underline-offset-4 hover:text-ivory">View the work</a>
        </div>
        <figure className="mx-auto w-full max-w-[460px]">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width={800}
            height={800}
            fetchPriority="high"
            className="aspect-square w-full rounded-md object-cover"
          />
          <figcaption className="mt-3 text-sm text-silver">{heroImage.caption}</figcaption>
        </figure>
      </div>
      <div className="border-t border-graphite-soft">
        <ul className="container-site grid gap-4 py-6 text-sm text-silver sm:grid-cols-3">
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-copper" aria-hidden />{business.base}, {business.region}</li>
          <li className="flex items-center gap-2"><span aria-hidden className="text-copper">✓</span>{copy.reviewLine}</li>
          <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-copper" aria-hidden />{copy.trustLine}</li>
        </ul>
      </div>
    </section>
  );
}
