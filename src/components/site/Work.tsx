import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { copy, workImages, type WorkImage } from "@/content/business";

const INITIAL = 6;

export function FeaturedWork() {
  const picks = copy.featuredIndices.map((i) => workImages[i]!);
  return (
    <section className="border-b bg-card py-16" aria-labelledby="featured-h">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured work</p>
            <h2 id="featured-h" className="mt-3 text-3xl font-bold">{copy.featuredTitle}</h2>
          </div>
          <a href="#work" className="text-sm font-semibold text-primary underline underline-offset-4">See all work</a>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {picks.map((img) => (
            <li key={img.file}>
              <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" className="aspect-square w-full rounded-md bg-muted object-contain" />
              <p className="mt-2 text-sm text-muted-foreground">{img.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProjectGallery() {
  const cats = Array.from(new Set(workImages.map((w) => w.category))).filter(
    (c) => workImages.filter((w) => w.category === c).length >= 2,
  );
  const [filter, setFilter] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const list = filter === "All" ? workImages : workImages.filter((w) => w.category === filter);
  const visible = showAll ? list : list.slice(0, INITIAL);

  const close = () => {
    const i = openIdx;
    setOpenIdx(null);
    if (i !== null) setTimeout(() => triggers.current[i]?.focus(), 0);
  };

  return (
    <section id="work" className="py-20">
      <div className="container-site">
        <p className="eyebrow">Our work</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{copy.galleryTitle}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {copy.galleryBody}
        </p>
        <div role="group" aria-label="Filter photos" className="mt-8 flex flex-wrap gap-2">
          {["All", ...cats].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => { setFilter(c); setShowAll(false); }}
              className={`btn min-h-11 border text-sm ${filter === c ? "border-graphite bg-graphite text-ivory" : "border-border bg-card"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {visible.map((img, i) => (
            <li key={img.file}>
              <button
                type="button"
                ref={(el) => { triggers.current[i] = el; }}
                onClick={() => setOpenIdx(i)}
                className="group block w-full text-left"
                aria-label={`Open larger photo: ${img.caption}`}
              >
                <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" className="aspect-square w-full rounded-md bg-muted object-contain transition-opacity group-hover:opacity-90" />
              </button>
              <p className="mt-2 text-sm text-muted-foreground">{img.caption}</p>
            </li>
          ))}
        </ul>
        {list.length > INITIAL && !showAll && (
          <button type="button" className="btn btn-outline mt-8" onClick={() => setShowAll(true)}>Show more work</button>
        )}
      </div>
      {openIdx !== null && (
        <Lightbox images={visible} index={openIdx} setIndex={setOpenIdx} onClose={close} />
      )}
    </section>
  );
}

function Lightbox({ images, index, setIndex, onClose }: { images: WorkImage[]; index: number; setIndex: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const img = images[index]!;
  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  useEffect(() => {
    ref.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "Tab" && ref.current) {
      const f = ref.current.querySelectorAll<HTMLElement>("button");
      const first = f[0]!, last = f[f.length - 1]!;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onKeyDown={onKey}
      className="fixed inset-0 z-50 flex items-center justify-center bg-graphite/95 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button data-close type="button" onClick={onClose} aria-label="Close photo viewer" className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-ivory text-graphite">
        <X aria-hidden />
      </button>
      <figure className="w-full max-w-[min(800px,80vh)]">
        <img src={img.src} alt={img.alt} width={800} height={800} className="mx-auto h-auto max-h-[75vh] w-auto max-w-full object-contain" />
        <figcaption className="mt-4 text-center text-ivory" aria-live="polite">
          {img.caption} <span className="text-silver">({index + 1} of {images.length})</span>
        </figcaption>
      </figure>
      {images.length > 1 && (
        <>
          <button type="button" onClick={prev} aria-label="Previous photo" className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md bg-ivory text-graphite"><ChevronLeft aria-hidden /></button>
          <button type="button" onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md bg-ivory text-graphite"><ChevronRight aria-hidden /></button>
        </>
      )}
    </div>
  );
}
