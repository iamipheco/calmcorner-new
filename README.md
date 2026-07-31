# Calmcorner Homes and Properties Ltd — Website

A React + Vite + Tailwind CSS site with Framer Motion animations: a
3-slide image hero with typewriter titles, wave-shaped section dividers,
a Founders section, and social links. Routing is in place so the
Realtor Network can grow into a full feature later.

## Getting started

This project was built without internet access, so `node_modules` isn't
included and hasn't been installed/tested here. To run it:

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy to any static host
(Vercel, Netlify, cPanel, etc.) pointed at `calmcornerproperties.ng`.

## Before going live

1. **Hero photos** — the hero slider currently falls back to a brand
   gradient because there are no real photos yet. Drop three images into
   `public/images/hero/` named `slide-1.jpg`, `slide-2.jpg`, `slide-3.jpg`
   (see the README in that folder for sizing guidance) and they'll appear
   automatically — no code changes needed.

2. **Director photos** — `src/components/Founders.jsx` currently shows
   circular initials ("KU" and "AM") in place of real photos. Once you
   have headshots, replace the initials div with an `<img>` for each
   founder.

3. **CalmVilla Residence specifics** — the Properties page deliberately
   doesn't state plot sizes, prices, or title status, since those weren't
   provided. It currently routes interested visitors to WhatsApp instead.
   Once you have firm numbers, add them directly in `src/pages/Properties.jsx`.

4. **Contact details** — all live in `src/siteConfig.js`: WhatsApp number,
   both phone numbers, both emails, address, and all four social links.
   Edit once there and every button/page picks it up.

5. **Realtor Network page** — currently a "coming soon" page with a
   waitlist form (`src/components/ComingSoon.jsx`). The form only shows a
   local confirmation message right now — nothing is sent or stored
   anywhere, since there's no backend yet. When you're ready to build it
   out for real:
   - A backend/API (e.g. Node + a database, or Supabase/Firebase)
   - Realtor authentication and a dashboard for tracking listings/leads
   - An admin area (routing in `src/App.jsx` makes it straightforward to
     add an `/admin` route behind a login later)

## What's in this version

- **Tailwind CSS** — brand colors, fonts and spacing in `tailwind.config.js`.
  Background is now pure white (previously an off-white cream) per the
  latest direction — the `cream` token in the config still exists for
  convenience but its value is `#FFFFFF`.
- **Image hero slider** (`HeroSlider.jsx`) — 3 slides, real photos or a
  gradient fallback, arrow + dot navigation, autoplay (pauses on hover).
- **Typewriter headline** (`TypewriterHeading.jsx` + `hooks/useTypewriter.js`)
  — each slide's heading types itself out when the slide becomes active.
- **Framer Motion** also powers: scroll-triggered fade-ups on every
  section (`Reveal.jsx`), the animated mobile menu, the floating WhatsApp
  button entrance, and page-to-page fade transitions in `App.jsx`.
- **Wave dividers** (`WaveDivider.jsx`) between dark (ink) and white/gray
  sections, matching the reference design you shared.
- **Rounded, shadowed cards** throughout (services, property feature,
  founders, forms) — a softer look than the original sharp-edged version.
- **Founders section** (`Founders.jsx`) — Kennedy Ekenedilichukwu Udemezue
  (Founder, MD/CEO) and Anyaefiena Ifechukwu Mathias (Co-Founder,
  Director/COO), shown on both Home and About.
- **Company timeline** (`Timeline.jsx`, on the About page) — founded
  November 2024, operations began 13 July 2026, framed as deliberate
  groundwork rather than downtime.
- **Social links** (`Socials.jsx`) — TikTok, X, Instagram, Facebook —
  shown in the footer and on the Contact page.
- **Subscribe / installment-buying page has been removed** — the route,
  nav link, footer link and sitemap entry are all gone. (If you want it
  back later, the old `ComingSoon` pattern used by `Realtors.jsx` is easy
  to reuse for it.)

## Project structure

```
src/
  App.jsx                route definitions + page transitions
  siteConfig.js           WhatsApp/phones/emails/address/socials — edit here
  index.css                Tailwind layers + small reusable component classes
  hooks/
    useTypewriter.js         typewriter text-reveal hook
  components/
    Header.jsx              nav bar, animated mobile menu
    Footer.jsx               socials, contact details, links
    Socials.jsx               social icon row (used in Footer + Contact)
    WhatsAppFloat.jsx        floating WhatsApp button
    HeroSlider.jsx            3-slide image hero with typewriter titles
    TypewriterHeading.jsx      typing <h1> used by the hero
    WaveDivider.jsx            reusable SVG wave section divider
    Ripples.jsx                 the brand's animated ripple motif
    Reveal.jsx                   scroll-triggered fade-up wrapper
    SectionHeading.jsx            eyebrow + heading, reusable
    Founders.jsx                   directors section
    Timeline.jsx                    company founding timeline
    ComingSoon.jsx                   "coming soon + waitlist" page shell
  pages/
    Home.jsx, About.jsx, Services.jsx, Properties.jsx, Contact.jsx
    Realtors.jsx           Realtor Network — coming soon
    NotFound.jsx             404 page
public/
  images/hero/            drop slide-1.jpg / slide-2.jpg / slide-3.jpg here
```

## Latest round of changes

- **New logo & favicon** — swapped into `src/assets/logo.png`, `src/assets/logo-mark.png`,
  and `public/favicon.png`. No code changes were needed since components import
  by filename, not by content.
- **Real hero photos** — `public/images/hero/slide-1.jpg`, `slide-2.jpg`,
  `slide-3.jpg` are now in place; the hero slider uses them directly.
- **Slogan removed from the Header and Hero Slider** — it's still shown on
  the About page and in the Footer. Edit/remove it anywhere via `SITE.slogan`
  in `src/siteConfig.js`.
- **"Property Development" renamed to "Property Development & Management"**
  everywhere it appeared (Home, Services, Contact).
- **Placeholder estates** — the Properties page now has a scrollable "More
  estates on the way" carousel with 3 sample entries (`OTHER_ESTATES` array
  at the top of `src/pages/Properties.jsx`). Each is clearly marked
  "Coming Soon" and uses the brand ripple motif instead of a photo — replace
  the name/location/price/blurb fields with real details (and add an
  `image` field once you have real photography) as each estate is confirmed.
- **Testimonials** — a new section (`src/components/Testimonials.jsx`) with
  3 placeholder quotes, shown on the Properties page. These are entirely
  made up as placeholders — swap them for real client feedback before
  launch. If you'd like this section on other pages too (e.g. Home), it's
  a one-line addition: `import Testimonials from '../components/Testimonials'`
  then `<Testimonials />` wherever you want it to appear.

## This round's changes

- **Hero stats replaced** — the fabricated "3+ Years / 100+ Happy Clients /
  100+ Properties Sold" set was swapped for an honest one (100% Verified
  Properties, 04 Core Services, 2024 Founded, 02 Founders) using the same
  visual treatment: modern icons (`lucide-react`), large numbers, short
  labels, hover animation. See `StatCard.jsx` and the stat strip in
  `HeroSlider.jsx`. If you have real figures you'd like to use instead
  (e.g. an actual client or sales count once you have one), swap the
  `value`/`label` props there.
- **Services section redesigned** — new dark, alternating-row layout
  (`ServicesSection.jsx`) matching the reference design, used on both the
  Home page (with a "More Services" button linking to `/services`) and the
  dedicated Services page. Content lives in one place: `src/data/services.js`.
- **About page fully rebuilt** from the document you provided — full
  narrative, Purpose/Vision/Mission, the C.A.L.M.C.O.R.N.E.R core values
  breakdown, the founding timeline (kept from before), Leadership, and the
  "Why Choose Calmcorner" 8-point list. All copy lives in `src/data/about.js`.
- **Founder photos** — `Founders.jsx` now looks for real photos at
  `/public/images/team/ceo.jpg` and `coo.jpg`. If they're not there (which
  they aren't yet), it automatically falls back to a placeholder silhouette
  — no code changes needed once you add the real photos, just drop them in
  with those exact filenames.
- **Leadership names/titles updated** to match the document: Ekenedilichukwu
  Kennedy Udemezue (Founder & CEO) and Anyaefiena Ifechukwu Mathias
  (Co-Founder & COO), with the fuller bios from the document.
- **New logo/favicon/hero photos** from the previous round remain in place.

## Color cleanup + Homepage rebuild

- **Removed the redundant `cream` color token** — it was set to pure white
  weeks ago but the name stuck around in a few components, which made the
  code confusing (and easy to introduce mismatches into). Everything now
  says `white` explicitly. Also normalized secondary text opacity on dark
  backgrounds to a single consistent `/70` (a couple of places had drifted
  to `/65` or `/75`).
- **Added a `gold` accent color** (`#D4AF37`, plus `gold-soft`) used only in
  the new Why Choose Calmcorner section, per your spec — kept isolated so
  it doesn't compete with the lime brand color elsewhere.
- **Homepage rebuilt to your exact structure**: Hero → Who We Are → Mission
  & Vision → Leadership → Services → Why Choose Calmcorner → Featured
  Properties → Testimonials → CTA → Footer. New components:
  `WhoWeAre.jsx`, `MissionVision.jsx`, `WhyChooseCalmcorner.jsx`,
  `FeaturedProperties.jsx`.
- **Hero is now genuinely full-screen** (`min-h-screen` instead of a fixed
  640px), stats redesigned as icon cards.
- **Why Choose Calmcorner** — dark background, left column (heading,
  paragraph, button) + right column (8 gold-icon cards), hover glow via a
  soft gold box-shadow + icon scale. Edit the `FEATURES` array in
  `WhyChooseCalmcorner.jsx` to change the 8 cards.
- **Estates data centralized** — `src/data/estates.js` now holds the
  placeholder estates, used by both the Home page carousel and the
  Properties page, so you only update it once.
- **Fixed a couple of section-transition seams** on the Properties page
  (two identical stone-colored sections were sitting back-to-back with no
  visual separation; rebalanced to alternate white/stone properly).

## Homepage Services section redesign

- **New light background** — `bg-mist` (`#F6FAEF`, a very pale green-white)
  replaces the dark background for the Homepage's services section only.
  The dedicated `/services` page keeps its dark alternating-row layout
  (`ServicesSection.jsx`, unchanged).
- **New card design** (`ServiceCard.jsx`) — fixed 320×380 card, icon badge
  by default; on hover the icon fades out, a photo slides down from the
  top to fill the same space, the title nudges up, a description fades in
  below it, and the "Learn More" label crossfades to "Explore Service"
  with the arrow sliding right. Card size never changes — only the
  content inside it does, per the spec.
- **New section wrapper** (`ServicesGrid.jsx`) — small green eyebrow, large
  heading, 4-card grid (4 cols desktop → 2 tablet → 1 mobile), "View All
  Services →" link to `/services` underneath.
- Edit the `CARDS` array at the top of `ServicesGrid.jsx` to change icons,
  titles, descriptions, images, or link targets for the 4 homepage cards.

## Services card simplified + Leadership redesign

- **Removed the icon-to-image hover reveal** on the Homepage services
  cards — simplified to a clean static card (icon badge, title,
  description, "Learn More →") with just a subtle lift + shadow on hover.
  Grid gap tightened from 24-28px down to 16px (`gap-4`).
- **Services page background lightened** — `ServicesSection.jsx` (used
  only by the dedicated `/services` page) now sits on the same light
  green-white `bg-mist` used elsewhere, instead of dark navy. Text colors
  flipped accordingly (dark text on light background). The page's hero
  banner stays dark for contrast, with a wave transition now added
  between it and the lightened section below.
- **Leadership cards redesigned** to a horizontal layout — photo on the
  left, name/role/short bio/LinkedIn stacked on the right, per your
  sketch. Bios are shorter now to fit the compact format. Note:
  `Founders.jsx` is shared between the Home and About pages, so this
  change applies to both — let me know if you'd rather the About page
  keep a fuller version.
- **LinkedIn links added** — currently placeholder (`#`) for both
  founders. Update the `linkedin` field in the `FOUNDERS` array at the
  top of `Founders.jsx` with their real profile URLs.

## Why Choose + Featured Properties rewrite

- **Why Choose Calmcorner copy replaced** with your new text — heading,
  slogan tie-in, two short paragraphs, and 6 feature cards (down from 8).
  Laid out tighter: 3-column card grid instead of 2, smaller padding/type,
  less vertical padding on the section overall, so it takes up noticeably
  less space than before.
- **Featured Properties is now one section, not two** — the old detailed
  CalmVilla card plus a separate "More estates on the way" carousel are
  gone from the Homepage. In their place: a single section that
  auto-advances every 5 seconds between estates (currently CalmVilla +
  one placeholder, "Golden Reserve Estate"), with small dot indicators,
  pausing on hover. Add a third entry to `FEATURED_ESTATES` in
  `src/data/estates.js` whenever a second real estate is confirmed.
- **The Properties page is unaffected** — it still shows the full
  "More estates on the way" carousel with all 3 placeholders, since that's
  where you wanted it to live.

## Leadership redesign (Homepage)

- **New alternating-row Leadership section** (`Leadership.jsx`) for the
  Homepage — "CEO" row with photo left/text right, "COO" row mirrored
  (text left/photo right), divider lines between rows, per your sketch.
  Larger photos and fuller bios than the compact card version.
- **The About page keeps the original compact card layout**
  (`Founders.jsx`, photo-left small card, side-by-side) — this request was
  scoped to the Homepage, so I left About as-is rather than changing both.
  Let it know if you'd like About updated to match this new style too.
- Same placeholders as before apply here: photos auto-fall-back to a
  silhouette until you add `ceo.jpg`/`coo.jpg` to `public/images/team/`,
  and LinkedIn links are still `#` pending the real URLs.

## Leadership on About page + eyebrow cleanup

- **About page now uses the alternating-row Leadership section** (the one
  built for the Homepage: photo left/right, name, role, bio, LinkedIn) —
  the old compact card version (`Founders.jsx`) has been removed since
  nothing uses it anymore.
- **Removed the small dash before every eyebrow label** sitewide, per your
  markup — eyebrows are plain text now. This touched every page/component
  that had one; the `.eyebrow-dash` CSS class is gone too.

## Upgraded to Tailwind CSS v4

This is the biggest change in this round, so please read this before
running it.

**What changed:**
- `tailwindcss` bumped from `^3.4.13` to `^4.3.3` (the current stable
  release as of this update).
- **`tailwind.config.js` is gone.** Tailwind v4 configures everything in
  CSS instead. All the custom colors and fonts that used to live there
  now live in a `@theme { ... }` block at the top of `src/index.css`.
- **`postcss.config.js` is gone.** Tailwind v4's official Vite plugin
  (`@tailwindcss/vite`) handles everything Vite needs directly —
  `postcss` and `autoprefixer` are no longer separate dependencies.
- **`vite.config.js`** now imports and registers `@tailwindcss/vite`.
- **`src/index.css`** now starts with `@import "tailwindcss";` instead of
  the old three `@tailwind base/components/utilities;` lines.
- A handful of utility classes were renamed in v4 and have been updated
  throughout the codebase to keep the site looking exactly the same as
  before:
  - `bg-gradient-to-*` → `bg-linear-to-*`
  - `shadow-sm` → `shadow-xs` (v4 renamed the whole shadow scale — this
    keeps the same subtle shadow weight the cards had before)
  - `flex-shrink-0` → `shrink-0`
  - `outline-none` → `outline-hidden`
- Every `border` utility in the codebase was already paired with an
  explicit color class (`border border-line`, `border border-white/12`,
  etc.), so v4's changed default border color (now `currentColor` instead
  of gray) doesn't affect anything here — nothing to fix.

**Please test this before deploying.** I don't have internet access in
the environment I built this in, so I could not run `npm install` or
`npm run dev` to actually compile and view the v4 build — everything
above is based on careful auditing of the codebase against Tailwind's
official v4 migration documentation, but a major version upgrade like
this is exactly the kind of change that benefits from a real look before
it goes live. After `npm install`, check in particular:
- All background gradients (hero, property cards, service icons)
- Card shadows (should look the same weight as before, not heavier)
- Form field focus states (the outline/border on click)
- The whole site at a glance for any obviously broken spacing or color

If anything looks off, tell me what you're seeing and I'll fix it —
having a screenshot helps a lot here, same as always.
