/** Business-specific demo content. Public source records are saved in research/. */
export type Business = {
  name: string; owner: string; callName: string; contactName: string;
  base: string; region: string; country: string; locationLine: string;
  phoneDisplay: string; phoneHref: string; whatsappBase: string | null;
  facebook: string | null; instagram: string | null; email: string | null;
  source: { label: string; url: string; checked: string }; demoBy: string;
};
export type Service = { id: string; title: string; body: string; group: "main" | "specialist" };
export type WorkImage = { file: string; src: string; alt: string; caption: string; category: string; width: number; height: number };
export const business: Business = {
  "name": "Ms Caplin Cleaning Services",
  "owner": "the team",
  "callName": "the team",
  "contactName": "the team",
  "base": "Gillingham",
  "region": "Medway, Kent",
  "country": "United Kingdom",
  "locationLine": "Home and commercial cleaning across Medway",
  "phoneDisplay": "07435594479",
  "phoneHref": "tel:+447435594479",
  "whatsappBase": "https://wa.me/447435594479",
  "facebook": null,
  "instagram": null,
  "email": null,
  "source": {
    "label": "Yell",
    "url": "https://www.yell.com/biz/ms-caplin-cleaning-services-gillingham-10075006/",
    "checked": "18 October 2026"
  },
  "demoBy": "Abdulrahman"
};

export const copy = {
  "aboutIndex": 0,
  "featuredIndices": [
    0,
    1,
    2,
    4
  ],
  "heroTitle": "Come home to a space that feels cared for.",
  "heroBody": "From a regular home clean to a tenancy handover or guest changeover, Ms Caplin Cleaning Services helps with the cleaning that makes a property ready to use. Explore the real results and discuss what you need.",
  "trustLine": "Contact the business for a quote",
  "reviewLine": "Yell overall: 4.2/5 from 5 ratings",
  "featuredTitle": "The difference a detailed clean can make",
  "galleryTitle": "Project gallery",
  "galleryBody": "Browse photographs published by the business, with captions describing the work and current condition.",
  "servicesTitle": "Help for the work you have in mind",
  "additionalTitle": "Other services",
  "aboutTitle": "Cleaning for homes, hosts and workplaces",
  "aboutBody": "Ms Caplin Cleaning Services is based in Gillingham and works across Medway. The published services cover homes, rented properties and business premises. Selected customer feedback praises detailed cleaning and property presentation.",
  "aboutPoints": [
    {
      "title": "See the work",
      "body": "Explore the published photographs and choose the areas you would like help with."
    },
    {
      "title": "Make the request clear",
      "body": "Include your postcode, property type, room count and cleaning priorities. Mention whether you need a one-off visit, regular help or a handover clean."
    }
  ],
  "enquiryIntro": "Include your postcode, property type, room count and cleaning priorities. Mention whether you need a one-off visit, regular help or a handover clean.",
  "areaPlaceholder": "Your town or postcode",
  "projectLabel": "Property or appliance",
  "projectPlaceholder": "e.g. two-bedroom flat or double oven",
  "quantityLabel": "Rooms or appliances",
  "quantityPlaceholder": "e.g. two bedrooms and one bathroom",
  "descriptionHint": "Describe the current condition, work required and any access restrictions.",
  "reviewIntro": "Short excerpts from five-star customer reviews on Yell."
};

export const enquiryConfig = { mode: "preview" } as const;

export const services: Service[] = [
  {
    "id": "domestic",
    "title": "Domestic cleaning",
    "body": "Arrange help with the rooms and surfaces you use every day. Discuss your priorities and how often you need a visit.",
    "group": "main"
  },
  {
    "id": "deep",
    "title": "Deep and one-off cleaning",
    "body": "Give the areas that need extra attention a more thorough clean. Describe the condition and any problem areas.",
    "group": "main"
  },
  {
    "id": "tenancy",
    "title": "End-of-tenancy cleaning",
    "body": "Share the property size, work required and handover date so the clean can be discussed before you move.",
    "group": "main"
  },
  {
    "id": "airbnb",
    "title": "HMO and Airbnb cleaning",
    "body": "Discuss shared accommodation or short-stay property cleaning, including room counts and changeover dates.",
    "group": "specialist"
  },
  {
    "id": "oven",
    "title": "Oven cleaning",
    "body": "Send the oven type and photos of its condition so the cleaning needed is clear.",
    "group": "specialist"
  },
  {
    "id": "commercial",
    "title": "Office and commercial cleaning",
    "body": "Explain the premises, access arrangements and preferred visiting times.",
    "group": "specialist"
  },
  {
    "id": "builders",
    "title": "After-builders cleaning",
    "body": "Discuss cleaning following building work, including the surfaces and areas that need attention.",
    "group": "specialist"
  },
  {
    "id": "ironing",
    "title": "Ironing services",
    "body": "Ask about ironing as part of the help you need at home.",
    "group": "specialist"
  }
];

export const serviceOptions = [...services.map(s => ({ value: s.id, label: s.title })), { value: "unsure", label: "Not sure yet" }];

export const reviews = [
  {
    "author": "LiamM-421",
    "date": "2026-08-17",
    "ratingLabel": "5/5",
    "quote": "spotless, fresh and beautifully presented",
    "source": "https://www.yell.com/biz/ms-caplin-cleaning-services-gillingham-10075006/"
  },
  {
    "author": "EllaB-172",
    "date": "2024-07-04",
    "ratingLabel": "5/5",
    "quote": "absolutely superb cleaner",
    "source": "https://www.yell.com/biz/ms-caplin-cleaning-services-gillingham-10075006/"
  },
  {
    "author": "GuliaS",
    "date": "2021-01-19",
    "ratingLabel": "5/5",
    "quote": "Such attention to detail - nothing missed.",
    "source": "https://www.yell.com/biz/ms-caplin-cleaning-services-gillingham-10075006/"
  }
];

export const workImages: WorkImage[] = [
  {
    "file": "caplin-project-01.jpg",
    "src": "/images/caplin-project-01.jpg",
    "alt": "Bathroom before-and-after cleaning collage",
    "caption": "Bathroom before-and-after cleaning collage",
    "category": "Bathroom cleaning",
    "width": 800,
    "height": 800
  },
  {
    "file": "caplin-project-02.jpg",
    "src": "/images/caplin-project-02.jpg",
    "alt": "Shower tray before-and-after cleaning collage",
    "caption": "Shower tray before-and-after cleaning collage",
    "category": "Deep cleaning",
    "width": 800,
    "height": 800
  },
  {
    "file": "caplin-project-03.jpg",
    "src": "/images/caplin-project-03.jpg",
    "alt": "Oven before-and-after cleaning collage",
    "caption": "Oven before-and-after cleaning collage",
    "category": "Oven cleaning",
    "width": 800,
    "height": 800
  },
  {
    "file": "caplin-project-05.jpg",
    "src": "/images/caplin-project-05.jpg",
    "alt": "Cupboard area shown after cleaning",
    "caption": "Cupboard area shown after cleaning",
    "category": "Kitchen cleaning",
    "width": 800,
    "height": 800
  },
  {
    "file": "caplin-project-06.jpg",
    "src": "/images/caplin-project-06.jpg",
    "alt": "Cleaned empty room with freshly vacuumed carpet",
    "caption": "Cleaned empty room with freshly vacuumed carpet",
    "category": "End of tenancy cleaning",
    "width": 800,
    "height": 800
  },
  {
    "file": "caplin-project-08.jpg",
    "src": "/images/caplin-project-08.jpg",
    "alt": "Oven interior with cleaned racks and glass",
    "caption": "Oven interior with cleaned racks and glass",
    "category": "Oven cleaning",
    "width": 800,
    "height": 800
  }
];

export const heroImage = workImages[4]!;

export const faqs = [
  {
    "q": "How do I arrange the work?",
    "a": "Contact the business with your location and a description of the work. Discuss the quote and availability before agreeing a visit."
  },
  {
    "q": "Which areas do you cover?",
    "a": "The business is based around Gillingham in Medway, Kent. Include your postcode when you get in touch so the team can confirm whether your location is covered."
  },
  {
    "q": "What helps with a quote?",
    "a": "Include your postcode, property type, room count and cleaning priorities. Mention whether you need a one-off visit, regular help or a handover clean."
  },
  {
    "q": "How can I get in touch?",
    "a": "Call 07435594479, send a WhatsApp message. Contact links are provided below."
  },
  {
    "q": "When can the work be done?",
    "a": "Timing depends on the work and current availability. Mention dates that suit you and discuss a quote and timing directly with the business before anything is booked."
  }
];

export const processSteps = [
  {
    "t": "Describe the work",
    "b": "Include your postcode, property type, room count and cleaning priorities. Mention whether you need a one-off visit, regular help or a handover clean."
  },
  {
    "t": "Talk it through",
    "b": "Contact the team to discuss the request, share photos and clarify the work required."
  },
  {
    "t": "Agree quote and timing",
    "b": "Discuss the price and a time that suits you both. An enquiry is a request for information, not a confirmed booking."
  }
];

export const timeframes = ["As soon as possible", "Within a month", "Flexible", "Just exploring"];

export function whatsappLink(text: string): string | null {
  return business.whatsappBase ? `${business.whatsappBase}?text=${encodeURIComponent(text)}` : null;
}
