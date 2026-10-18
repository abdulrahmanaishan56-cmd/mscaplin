import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { FeaturedWork, ProjectGallery } from "@/components/site/Work";
import { Services } from "@/components/site/Services";
import { AboutBusiness, Faq, Process, ReviewSection } from "@/components/site/About";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { MobileActionBar, SiteFooter } from "@/components/site/SiteFooter";

const title = "Ms Caplin Cleaning Services | Home and commercial cleaning across Medway";
const description = "From a regular home clean to a tenancy handover or guest changeover, Ms Caplin Cleaning Services helps with the cleaning that makes a property ready to use. Explore the real results and discuss what you need.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [preselect, setPreselect] = useState<{ id: string; n: number } | null>(null);
  const onEnquire = (id: string) => {
    setPreselect((p) => ({ id, n: (p?.n ?? 0) + 1 }));
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.getElementById("f-service")?.focus({ preventScroll: true }), 400);
  };
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <FeaturedWork />
        <Services onEnquire={onEnquire} />
        <AboutBusiness />
        <ReviewSection />
        <ProjectGallery />
        <Process />
        <Faq />
        <EnquiryForm preselect={preselect} />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
