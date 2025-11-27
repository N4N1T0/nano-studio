# NANO-9 — High-End Website Portfolio

An Astro-powered portfolio showcasing high-end websites and digital experiences with refined motion design and interaction. It blends GSAP-driven animations, a minimal slider, and an elegant contact workflow to reflect luxury brand aesthetics while staying fast and accessible.

## Features

- Interactive hero with preloader and split overlay driven by GSAP.
- Slider with wheel/touch navigation and a `slidechange` custom event.
- Contact overlay with dynamic media synced to the slider index.
- Clean contact form workflow using Astro Actions and Resend email API.
- Bottom-up “About” overlay in the footer with SplitText line reveals.
- TailwindCSS for styling, Vercel adapter for deployment, and compressor integration.

## Tech Stack

- `Astro` (static output) with `@astrojs/vercel`
- `GSAP` (`CustomEase`, `SplitText`)
- `TailwindCSS` via `@tailwindcss/vite` (Tailwind v4)
- `TypeScript`
- `Resend` (email sending)

## Project Structure

```
/
├── public/
│   ├── cursor.svg
│   └── favicon.svg
├── src/
│   ├── actions/
│   │   └── index.ts
│   ├── assets/
│   │   ├── Arc Projects.webp
│   │   ├── Cancan furnishing.webp
│   │   ├── Minas Design.webp
│   │   ├── Silver Pinewood Residences.webp
│   │   ├── The Drake.webp
│   │   └── index.ts
│   ├── components/
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   ├── Form.astro
│   │   ├── Head.astro
│   │   ├── Hero.astro
│   │   └── Slider.astro
│   ├── layout/
│   │   └── HomeLayout.astro
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## Key Components

- `Hero.astro`
  - Preloader and split overlay with GSAP timeline.
  - Tag words animate into view; an initial veil prevents FOUC.
- `Slider.astro`
  - Touch and wheel controls navigate slides.
  - Dispatches `slidechange` with `{ detail: { index } }` after updates.
- `Contact.astro`
  - Overlay panel with dynamic image bound to current slide.
  - Animations with `clip-path`, `CustomEase`, and `SplitText` lines.
- `Form.astro`
  - Minimal form integrated with Astro Actions; success/failure UI.
  - Client-side gibberish validation using `src/lib/utils.ts`.
- `Footer.astro`
  - Bottom-up “About” overlay with line reveals and graceful close.
  - Displays page counter bound to slider.
- `Head.astro`
  - Static meta tags for portfolio branding and favicon setup.

## Data & Content

- `src/assets/index.ts` contains the `slides` array with imported WEBP images and metadata (`title`, `description`, `href`, `image.src`, `image.alt`).
- To add a new slide:
  1. Add a new asset file under `src/assets/`.
  2. Import it in `src/assets/index.ts` and append a new object to `slides`.

## Validation

- `src/lib/utils.ts`
  - `isJibberish(input)`: Detects key-smash patterns, low vowel ratio, repeated characters, symbol-heavy content, and long random sequences.
  - `getJibberishMessage(field, reason)`: User-friendly messages for invalid `name` or `message` inputs.
- Used in `Form.astro` before submitting the action; errors are shown via `#form-status p`.

## Actions & Email

- `src/actions/index.ts` uses Astro Actions with `zod` schema and Resend.
- Env var required: `RESEND_API_KEY`.
- Sends a well-formatted HTML email including name, email, and the message.

## Configuration

- `astro.config.mjs`
  - `site` switches based on `ENV` (`development` → `https://nano-studio-red.vercel.app/`, otherwise `https://www.nanostudio.pro/`).
  - Integrations: `compressor`, `sitemap`, `robots-txt`.
  - Adapter: `@astrojs/vercel` with `output: 'static'`.
- `tsconfig.json`
  - Path alias: `@/*` → `src/*`.

## Styling

- `src/styles/global.css` applies Tailwind utility classes and small custom styles for animations (`.line`, `.slide`, `.card`, etc.).
- Tailwind v4 via Vite plugin (`@tailwindcss/vite`).

## Commands

- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev` (defaults to `http://localhost:4321`)
- Build: `pnpm build`
- Preview production build: `pnpm preview`
- Type checking & diagnostics: `pnpm check` (Astro Check)

## Environment Variables

Create `.env` for local development:

```
RESEND_API_KEY=your_resend_api_key_here
ENV=development
```

For production (`ENV` not equal to `development`), the site URL is set to `https://www.nanostudio.pro/` and the sitemap points to `https://www.nanostudio.pro/sitemap-0.xml`.

## Deployment

- Uses Vercel adapter for deployment.
- Static output; build with `pnpm build` and deploy the output.

## Notes

- Animations rely on GSAP (`CustomEase`, `SplitText`) and carefully timed initial states to avoid flashes.
- The slider publishes `slidechange` which is consumed by the contact overlay to sync imagery.
- The contact form implements optimistic UI transitions and resets after success.

---

<div align="center">
  <p>Made with ❤️ by Adrian "Nano" Alvarez</p>
  <p>⭐ Star this repo if you found it helpful!</p>
  <p>☕ <a href="https://buymeacoffee.com/n4n1t0">Buy me a coffee</a></p>
</div>
