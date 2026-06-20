# Terracielo Gastrobar Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete premium one-page Next.js 16 website for Terracielo Gastrobar with SEO, conversion CTAs, Fudo menu handoff, and WhatsApp reservations.

**Architecture:** Static App Router homepage backed by typed data modules. Server Components render content sections; client components handle Motion animations and WhatsApp form behavior.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion for React, `next/image`.

---

## File Structure

- Create `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `README.md`: project tooling and execution docs.
- Create `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/not-found.tsx`: App Router, global styles, SEO routes, page shell.
- Create `src/data/site.ts`: all restaurant data, links, dishes, events, gallery, testimonials, promotions, and SEO constants.
- Create `src/types/site.ts`: reusable domain types.
- Create `src/lib/links.ts`, `src/lib/seo.ts`, `src/lib/utils.ts`: WhatsApp URLs, JSON-LD, class joining.
- Create `src/components/ui/*`: reusable buttons, animated wrappers, section heading, cards.
- Create `src/components/layout/*`: header, footer, floating WhatsApp.
- Create `src/components/sections/*`: one focused component per homepage section.

## Tasks

### Task 1: Scaffold project files

- [ ] Add Next.js, TypeScript, Tailwind, Motion, lint, and build scripts.
- [ ] Configure Unsplash remote images in `next.config.ts`.
- [ ] Configure Tailwind v4 entrypoint in `globals.css`.

### Task 2: Add data and helpers

- [ ] Define typed restaurant metadata, CTA links, placeholders, events, promotions, and testimonials.
- [ ] Add WhatsApp URL helper for static CTAs and reservation form messages.
- [ ] Add JSON-LD helper for LocalBusiness, Restaurant, and BarOrPub structured data.

### Task 3: Add reusable UI and layout

- [ ] Build animated section wrappers with `motion/react`.
- [ ] Build CTA buttons, section headings, header, footer, and floating WhatsApp.
- [ ] Keep animation components client-only and leaf-level.

### Task 4: Build homepage sections

- [ ] Implement hero, about, dishes, cocktails, events, gallery, testimonials, reservations, location, and promotions.
- [ ] Use responsive mobile-first layouts and premium dark visual system.
- [ ] Ensure Fudo links stay external and WhatsApp reservation links are generated correctly.

### Task 5: Add SEO routes and documentation

- [ ] Add metadata, Open Graph, Twitter card settings, robots, sitemap, and JSON-LD.
- [ ] Add README execution and future improvement notes.
- [ ] Run dependency install, lint, and build verification.
