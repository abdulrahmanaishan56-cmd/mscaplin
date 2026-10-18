import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ProjectGallery } from "@/components/site/Work";
import { ReviewSection } from "@/components/site/About";
import { business, copy, services, reviews, workImages } from "@/content/business";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Business demo behaviour", () => {
  it("validates and previews business-specific enquiry fields without sending a request", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<EnquiryForm preselect={null} />);
    fireEvent.click(screen.getByRole("button", { name: "Preview my enquiry" }));
    expect(screen.getByLabelText(/^Name /)).toHaveFocus();
    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/^Name /), { target: { value: "Demo Customer" } });
    fireEvent.change(screen.getByLabelText(/^Email /), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/^Area or postcode /), { target: { value: business.base } });
    fireEvent.change(screen.getByLabelText(/^Service /), { target: { value: services[0]!.id } });
    fireEvent.change(screen.getByLabelText(copy.projectLabel + " (optional)"), { target: { value: "Front area" } });
    fireEvent.change(screen.getByLabelText(copy.quantityLabel + " (optional)"), { target: { value: "Approximately 12 square metres" } });
    fireEvent.change(screen.getByLabelText(/^Describe the work /), { target: { value: "Please discuss the work shown in my photos." } });
    fireEvent.click(screen.getByRole("button", { name: "Preview my enquiry" }));
    expect(screen.getByRole("heading", { name: "Your enquiry preview" })).toBeInTheDocument();
    expect(screen.getByText("Preview only. Your enquiry has not been sent.")).toBeInTheDocument();
    expect(screen.getByText("Approximately 12 square metres")).toBeInTheDocument();
    expect(screen.getByText(services[0]!.title)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Edit details" }));
    expect(screen.getByLabelText(copy.projectLabel + " (optional)")).toHaveValue("Front area");
    fireEvent.click(screen.getByRole("button", { name: "Preview my enquiry" }));
    fireEvent.click(screen.getByRole("button", { name: "Clear preview" }));
    expect(screen.getByLabelText(/^Name /)).toHaveValue("");
  });

  it("preselects services and exposes only published contact channels", () => {
    const last = services.at(-1)!;
    render(<EnquiryForm preselect={{ id: last.id, n: 1 }} />);
    expect(screen.getByLabelText(/^Service /)).toHaveValue(last.id);
    expect(screen.getByRole("link", { name: new RegExp("^Call ") })).toHaveAttribute("href", business.phoneHref);
    const wa = screen.queryByRole("link", { name: "Send photos on WhatsApp" });
    if (business.whatsappBase) {
      expect(wa).toBeInTheDocument();
      const url = new URL(wa!.getAttribute("href")!);
      expect(url.origin + url.pathname).toBe(business.whatsappBase);
      expect(url.searchParams.get("text")).toContain(last.title.toLowerCase());
    } else expect(wa).not.toBeInTheDocument();
    const email = screen.queryByRole("link", { name: /^Email / });
    if (business.email) expect(email).toHaveAttribute("href", `mailto:${business.email}`);
    else expect(email).not.toBeInTheDocument();
  });

  it("shows the full local photo gallery and supports the photo viewer", () => {
    render(<ProjectGallery />);
    expect(screen.getAllByRole("img")).toHaveLength(Math.min(6, workImages.length));
    if (workImages.length > 6) fireEvent.click(screen.getByRole("button", { name: "Show more work" }));
    expect(screen.getAllByRole("img")).toHaveLength(workImages.length);
    for (const img of screen.getAllByRole("img")) expect(img.getAttribute("src")).toMatch(/^\/images\//);
    fireEvent.click(screen.getAllByRole("button", { name: /^Open larger photo:/ })[0]!);
    const dialog = screen.getByRole("dialog", { name: "Photo viewer" });
    expect(dialog).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps recommendation and ten-point review labels accurate", () => {
    render(<ReviewSection />);
    for (const r of reviews) {
      expect(screen.getByText(`"${r.quote}"`)).toBeInTheDocument();
      expect(screen.getAllByLabelText(r.ratingLabel).length).toBeGreaterThan(0);
    }
    const links = screen.getAllByRole("link", { name: `Read on ${business.source.label}` });
    expect(links.map(link => link.getAttribute("href"))).toEqual(reviews.map(r => r.source));
  });
});
