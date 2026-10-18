# Ms Caplin Cleaning Services demo

This is the uploaded website design with this business's text, services, project photos, reviews and published contacts. The original colour stylesheet is unchanged.

## Build and host on Cloudflare Workers

1. Extract the ZIP. Upload its contents with package.json and src at the repository's top level.
2. Connect that repository in Cloudflare Workers & Pages, choosing a Worker.
3. Build command: `npm run build`.
4. Deploy command: `npm run deploy`.
5. Root directory: leave blank when package.json is at the top level. Use Node.js 22 or later.

The generated Worker name is `ms-caplin-cleaning-services-demo`. Add your custom domain after deployment if wanted. This demo needs no database binding or API keys. No deployment was made on your account.

## Enquiry status

The enquiry form validates details and shows a local preview. It does not email, save enquiries or make bookings. Published phone, Facebook, email and verified WhatsApp links are displayed where available. WhatsApp opens a draft that the visitor can review before sending. An email button opens the visitor's mail app; it does not connect the form to an inbox.

When the owner wants a working inbox form, add the email backend and test delivery. Do not change a mode flag expecting email delivery: no email backend is included in this export.

## Content

All project photos are included locally in public/images, so the site does not rely on expiring Facebook photo links. The editable business text and gallery list are in src/content/business.ts. Review sources, public contacts and original photo manifests are in research. The concept-demo footer and noindex setting remain until the owner approves publication.
