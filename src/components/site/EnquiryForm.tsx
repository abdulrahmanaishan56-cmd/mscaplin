import { useEffect, useRef, useState } from "react";
import { business, copy, serviceOptions, timeframes, whatsappLink } from "@/content/business";

type Values = {
  name: string; email: string; phone: string; area: string; service: string;
  project: string; quantity: string; description: string; timeframe: string;
};
const empty: Values = { name: "", email: "", phone: "", area: "", service: "", project: "", quantity: "", description: "", timeframe: "" };
type Errors = Partial<Record<keyof Values, string>>;

export function validateEnquiry(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email, such as name@example.com.";
  if (!v.area.trim()) e.area = "Please enter your area or postcode.";
  if (!v.service) e.service = "Please choose a service, or Not sure yet.";
  if (v.description.trim().length < 10) e.description = "Please describe the work in a few words.";
  if (v.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim())) e.phone = "Please check the phone number.";
  return e;
}

const order: (keyof Values)[] = ["name", "email", "phone", "area", "service", "project", "quantity", "description", "timeframe"];

export function EnquiryForm({ preselect }: { preselect: { id: string; n: number } | null }) {
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [preview, setPreview] = useState(false);
  const [announce, setAnnounce] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preselect) return;
    setV((p) => ({ ...p, service: preselect.id }));
    setPreview(false);
    const label = serviceOptions.find((o) => o.value === preselect.id)?.label;
    setAnnounce(`${label} selected in the enquiry form.`);
  }, [preselect]);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (touched[k] && errors[k]) setErrors((p) => ({ ...p, [k]: validateEnquiry(next)[k] }));
  };
  const blur = (k: keyof Values) => () => {
    setTouched((p) => ({ ...p, [k]: true }));
    setErrors((p) => ({ ...p, [k]: validateEnquiry(v)[k] }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateEnquiry(v);
    setErrors(errs);
    const first = order.find((k) => errs[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // This demo previews details locally. Inbox delivery needs a backend connection.
    setPreview(true);
    setTimeout(() => summaryRef.current?.focus(), 0);
  };

  const svcLabel = serviceOptions.find((o) => o.value === v.service)?.label ?? "";
  const waText = [
    `Hi ${business.contactName}, I'd like a quote${svcLabel ? ` for ${svcLabel.toLowerCase()}` : ""}.`,
    v.name && `Name: ${v.name.trim()}`,
    v.email && `Email: ${v.email.trim()}`,
    v.phone && `Phone: ${v.phone.trim()}`,
    v.area && `Area: ${v.area.trim()}`,
    v.project && `${copy.projectLabel}: ${v.project.trim()}`,
    v.quantity && `${copy.quantityLabel}: ${v.quantity.trim()}`,
    v.timeframe && `Timeframe: ${v.timeframe}`,
    v.description.trim(),
    "I can attach photos of the work needed.",
  ].filter(Boolean).join("\n");
  const waHref = whatsappLink(waText);

  const f = (k: keyof Values, label: string, opts: { required?: boolean; type?: string; autoComplete?: string; placeholder?: string } = {}) => (
    <div>
      <label htmlFor={`f-${k}`} className="block text-sm font-semibold">
        {label} <span className="font-normal text-muted-foreground">{opts.required ? "(required)" : "(optional)"}</span>
      </label>
      <input
        id={`f-${k}`} name={k} type={opts.type ?? "text"} autoComplete={opts.autoComplete} placeholder={opts.placeholder}
        value={v[k]} onChange={set(k)} onBlur={blur(k)} aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `e-${k}` : undefined} aria-required={opts.required}
        className="field mt-1.5"
      />
      {errors[k] && <p id={`e-${k}`} className="mt-1 text-sm text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <section id="enquire" className="bg-muted py-20">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Enquire</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Request a quote</h2>
          <p className="mt-4 text-muted-foreground">{copy.enquiryIntro}</p>
          <div className="mt-8 space-y-3">
            <a href={business.phoneHref} className="btn btn-outline w-full sm:w-auto">Call {business.callName} on {business.phoneDisplay}</a>
            {business.email && <div><a href={`mailto:${business.email}`} className="btn btn-outline w-full sm:w-auto">Email {business.callName}</a></div>}
            {waHref && <div>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full sm:w-auto">Send photos on WhatsApp</a>
              <p className="mt-2 text-sm text-muted-foreground">Opens an unsent WhatsApp draft with your details. You attach photos and choose whether to send.</p>
            </div>}
            {business.facebook && <p className="pt-2 text-sm text-muted-foreground">
              Message the business on <a className="underline" href={business.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              {business.instagram && <> or <a className="underline" href={business.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></>}.
            </p>}
          </div>
        </div>

        <div className="rounded-md border bg-card p-6 md:p-8">
          <p className="sr-only" aria-live="polite">{announce}</p>
          {preview ? (
            <div ref={summaryRef} tabIndex={-1} aria-labelledby="sum-h" className="outline-none">
              <h3 id="sum-h" className="text-xl font-semibold">Your enquiry preview</h3>
              <p className="mt-2 rounded-sm bg-accent px-3 py-2 text-sm font-semibold">Preview only. Your enquiry has not been sent.</p>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-[10rem_1fr]">
                {([
                  ["Name", v.name], ["Email", v.email], ["Phone", v.phone], ["Area or postcode", v.area],
                  ["Service", svcLabel], [copy.projectLabel, v.project], [copy.quantityLabel, v.quantity],
                  ["Timeframe", v.timeframe], ["Description", v.description],
                ] as const).filter(([, val]) => val).map(([k, val]) => (
                  <div key={k} className="contents">
                    <dt className="font-semibold">{k}</dt>
                    <dd className="whitespace-pre-wrap break-words text-muted-foreground">{val}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn btn-primary" onClick={() => { setPreview(false); setTimeout(() => formRef.current?.querySelector<HTMLElement>("[name=name]")?.focus(), 0); }}>Edit details</button>
                <button type="button" className="btn btn-outline" onClick={() => { setV(empty); setErrors({}); setTouched({}); setPreview(false); }}>Clear preview</button>
              </div>
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={submit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {f("name", "Name", { required: true, autoComplete: "name" })}
                {f("email", "Email", { required: true, type: "email", autoComplete: "email", placeholder: "name@example.com" })}
                {f("phone", "Phone", { type: "tel", autoComplete: "tel", placeholder: "07..." })}
                {f("area", "Area or postcode", { required: true, autoComplete: "postal-code", placeholder: copy.areaPlaceholder })}
              </div>
              <div>
                <label htmlFor="f-service" className="block text-sm font-semibold">Service <span className="font-normal text-muted-foreground">(required)</span></label>
                <select id="f-service" name="service" value={v.service} onChange={set("service")} onBlur={blur("service")}
                  aria-invalid={!!errors.service} aria-describedby={errors.service ? "e-service" : undefined} aria-required className="field mt-1.5">
                  <option value="">Choose a service</option>
                  {serviceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.service && <p id="e-service" className="mt-1 text-sm text-destructive">{errors.service}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {f("project", copy.projectLabel, { placeholder: copy.projectPlaceholder })}
                {f("quantity", copy.quantityLabel, { placeholder: copy.quantityPlaceholder })}
              </div>
              <div>
                <label htmlFor="f-description" className="block text-sm font-semibold">Describe the work <span className="font-normal text-muted-foreground">(required)</span></label>
                <p id="h-description" className="text-sm text-muted-foreground">{copy.descriptionHint}</p>
                <textarea id="f-description" name="description" rows={5} value={v.description} onChange={set("description")} onBlur={blur("description")}
                  aria-invalid={!!errors.description} aria-required aria-describedby={`h-description${errors.description ? " e-description" : ""}`} className="field mt-1.5" />
                {errors.description && <p id="e-description" className="mt-1 text-sm text-destructive">{errors.description}</p>}
              </div>
              <div>
                <label htmlFor="f-timeframe" className="block text-sm font-semibold">Preferred timeframe <span className="font-normal text-muted-foreground">(optional)</span></label>
                <select id="f-timeframe" name="timeframe" value={v.timeframe} onChange={set("timeframe")} className="field mt-1.5">
                  <option value="">Choose</option>
                  {timeframes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="btn btn-primary">Preview my enquiry</button>
                <p className="text-sm font-semibold text-muted-foreground">Demo form. Nothing is sent.</p>
              </div>
              <p className="text-sm text-muted-foreground">Privacy: this preview keeps your details on this page only. Nothing is sent or saved.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
