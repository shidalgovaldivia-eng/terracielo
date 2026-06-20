# Terracielo Gastrobar Web Design

## Goal

Build a premium, conversion-focused one-page website for Terracielo Gastrobar in Alto Hospicio, Chile. The site must strengthen the brand, increase WhatsApp inquiries and reservations, improve local SEO, and send menu traffic to Fudo instead of replacing it.

## Positioning

Terracielo is presented as a restaurant, cafe, and gastrobar with a nocturnal, social, event-driven personality. The visual system uses deep black, wine red, neon red, white, and subtle gold, matching the provided Instagram reference and the existing "Sabor y vida" brand signal.

## Content Architecture

The homepage contains these conversion sections in order:

1. Hero with brand name, value proposition, CTAs for reservation, Fudo menu, and WhatsApp.
2. About section with editable story, mission, vision, and differentiators.
3. Featured dishes grid with 6 items and a Fudo CTA.
4. Cocktail and Happy Hour feature section.
5. Event calendar cards for karaoke, DJ sessions, Guerra de Sexos, Halloween, San Valentin, and private events.
6. Gallery masonry grid using premium Unsplash placeholders.
7. Testimonials styled like Google reviews.
8. Reservation form that builds a WhatsApp message.
9. Location section with map embed, address, hours, phone, and Instagram.
10. Promotions banner cards.
11. Footer with complete contact links, Fudo, WhatsApp, location, social links, and policies.

## Technical Design

Use Next.js 16 App Router with TypeScript, Tailwind CSS, and Motion for React animations. Keep most sections as Server Components with client components only where interaction is required: animation wrappers, CTA motion buttons, reservation form, and floating WhatsApp.

Data lives in `src/data/site.ts` so future integrations can replace static arrays without rewriting components. Shared helpers live in `src/lib`, and domain types live in `src/types`.

## SEO Design

Implement static metadata in `src/app/layout.tsx`, `robots.ts`, `sitemap.ts`, and JSON-LD in the homepage. Structured data includes Restaurant and BarOrPub semantics through schema.org, with local address, phone, opening hours, social profile, cuisine, keywords, and menu/reservation URLs.

## Accessibility and Performance

Use semantic sections, real headings, descriptive image alt text, focus-visible styles, high contrast CTAs, responsive grids, optimized `next/image`, and static rendering. CTAs must remain visible on mobile, including a floating WhatsApp button.

## Deferred Integrations

Future work can add CMS-driven events/promotions, real reservation backend, Fudo API integration if available, Google Reviews API, analytics, and professional photography.
