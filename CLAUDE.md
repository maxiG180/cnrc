# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CNRC (Camacho Nunes Recuperação de Crédito) website built with Next.js 15, React 19, and Tailwind CSS 4. A marketing site for a Portuguese credit recovery company with MDX-based content management for news, judicial procedures (diligencias), and real estate listings.

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type checking without emit
```

## Architecture

### Route Groups & Layout Structure

The app uses Next.js 15 App Router with route groups:

- `(marketing)/` - Main marketing pages (about, services, contact, etc.)
- `(legal)/` - Legal pages (privacy, terms, cookies)
- Root `layout.tsx` applies global layout: Header → main → Footer + CookieBanner + WhatsappWidget

All pages are wrapped in a `LenisProvider` for smooth scrolling.

### Content Management (MDX)

Content lives in `/content` directory and is consumed via utility functions in `lib/mdx.ts`:

**Three content types:**

1. **News** (`content/news/*.mdx`)
   - Frontmatter: `title`, `date`, `excerpt`, `category`, `tags`, `hero`
   - Functions: `getAllNews()`, `getNewsBySlug(slug)`
   - Sorted by date descending

2. **Diligencias** (`content/diligencias/*.mdx`)
   - Frontmatter: `title`, `breadcrumb`, `eyebrow`, `intro`, `hero`, `heroVideo`, `capabilities[]`, `gallery[]`
   - Functions: `getDiligenciaBySlug(slug)`, `getDiligenciaSlugs()`
   - Used for judicial procedure service pages

3. **Real Estate Listings** (`content/imobiliario/listings/*.mdx`)
   - Frontmatter: `title`, `category`, `location`, `price`, `hero`, `videos[]`, `gallery[]`, `summary`
   - Functions: `getAllListings()`, `getListingsByCategory(category)`, `getAllListingCategories()`

**MDX Rendering:** Uses `next-mdx-remote/rsc` for server-side MDX compilation.

### Design System

**Core Components:**

- `Section` - Main layout primitive with tone and spacing system
  - Tones: `bone`, `bone-soft`, `navy`, `navy-deep`
  - Spacing: `sm`, `md`, `lg`, `xl` (maps to responsive py classes)
  - Use `!pb-0` or `!pt-0` to eliminate padding on one side when stacking same-tone sections

- `Container` - Horizontal spacing wrapper
  - Sizes: `narrow` (72ch), `content` (1100px), `wide` (1400px)
  - Default: `content` with responsive horizontal padding (px-6 md:px-10)

**Color System (CSS variables in `globals.css`):**
- Navy: `--color-navy`, `--color-navy-deep`, `--color-navy-soft`
- Bone: `--color-bone`, `--color-bone-soft`
- Gold: `--color-gold`, `--color-gold-bright`, `--color-gold-dim`
- Utility: `--color-stone`, `--color-stone-dark`, `--color-ink`, `--color-danger`, `--color-success`

**Typography:**
- Sans: Inter (via `--font-inter` variable)
- Display: Fraunces (via `--font-fraunces` variable)
- Headings use `font-display` (Fraunces) with fluid clamp sizing

### Key Libraries

- **Vidstack** (`@vidstack/react`) - Video player for hero videos and listings
- **Framer Motion** - Animations (scroll-triggered reveals via `Reveal` component)
- **GSAP** + **Lenis** - Smooth scroll and advanced animations
- **Embla Carousel** - Hero slider and image galleries
- **Gray Matter** - Frontmatter parsing for MDX files
- **React Hook Form** + **Zod** - Form handling and validation

### Page Structure Patterns

**Typical page layout:**
```tsx
<Section tone="navy-deep" spacing="lg">
  <Container size="wide">
    {/* Hero content */}
  </Container>
</Section>

<Section tone="bone" spacing="lg">
  <Container size="content">
    {/* Main content */}
  </Container>
</Section>
```

**When stacking same-tone Sections:** Use `!pb-0` on the first and `!pt-0` on the second to prevent padding doubling:
```tsx
<Section tone="bone" spacing="lg" className="!pb-0">
  {/* Video or media */}
</Section>
<Section tone="bone" spacing="lg" className="!pt-0">
  {/* Text content */}
</Section>
```

### Metadata & SEO

- `lib/metadata.ts` - Centralized metadata helpers
- `lib/schema-org.ts` - JSON-LD structured data (local business schema)
- Company info in `content/shared/company-info.ts`
- All pages use template title pattern: `%s | CNRC Recuperação de Crédito`

### Image Handling

Next.js Image component configured to accept remote images from:
- `www.cnrc.pt`
- `cnrc.pt`
- `picsum.photos`

Optimized formats: AVIF, WebP

### Styling Notes

- Uses Tailwind CSS 4 with `@tailwindcss/postcss`
- Custom theme defined in `@theme` block in `globals.css`
- Utility-first approach with design tokens via CSS variables
- Access colors via `text-[color:var(--color-navy)]` syntax
- Border colors use `color-mix` for semi-transparent stone borders by default

### Animation Patterns

- `Reveal` component wraps content for scroll-triggered fade-in animations
- Lenis provides smooth scroll behavior site-wide
- GSAP used for complex timeline animations
- Framer Motion for component-level animations

## Common Patterns

**Creating a new MDX content page:**
1. Add `.mdx` file to appropriate `content/` subdirectory
2. Include required frontmatter fields for that content type
3. Use `MDXRemote` in page component to render content
4. Leverage existing `lib/mdx.ts` utilities for data fetching

**Adding a new Section:**
1. Choose appropriate `tone` and `spacing`
2. Nest `Container` with appropriate `size`
3. Use `!pb-0`/`!pt-0` when stacking same-tone sections to avoid padding doubling

**Color usage:**
- Always use CSS variable syntax: `text-[color:var(--color-navy)]`
- Never hardcode hex values in components
- Use semantic color names from the design system

**Copywriting guidelines:**
- NEVER use em dashes (—) in copy as they are a red flag for AI-generated content
- Use periods, commas, or semicolons instead for natural, human-sounding text

## Critical: Section Spacing Anti-Pattern

**Problem encountered:** When the user requests "equal spacing above and below an element", do NOT overcomplicate the solution.

### What Went Wrong

When asked to make spacing equal above and below a video player, the following mistakes were made:

1. **Over-analyzing padding math** - Attempted complex calculations adding multiple padding values (pb-32 + pt-32 = 64, etc.)
2. **Trying exotic solutions** - Used custom values like `mt-[12rem]`, `mt-[16rem]`, consolidating sections into one, applying padding to containers instead of sections
3. **Missing the simple solution** - The answer was right there from the start: use `!pb-0` and `!pt-0` to eliminate duplicated padding

### The Simple Solution

When two `Section` components with the **same tone** are stacked, their padding adds up:

```tsx
{/* ❌ WRONG - Padding doubles between sections */}
<Section tone="bone" spacing="lg">  {/* py-24 md:py-32 */}
  <Container size="wide">
    <VideoPlayer />
  </Container>
</Section>

<Section tone="bone" spacing="lg">  {/* py-24 md:py-32 */}
  <Container size="content">
    <article>Content</article>
  </Container>
</Section>
{/* Space between = pb-32 + pt-32 = 64 (16rem on desktop) */}
```

```tsx
{/* ✅ CORRECT - Remove one side of padding to prevent doubling */}
<Section tone="bone" spacing="lg" className="!pb-0">
  <Container size="wide">
    <VideoPlayer />
  </Container>
</Section>

<Section tone="bone" spacing="lg" className="!pt-0">
  <Container size="content">
    <article>Content</article>
  </Container>
</Section>
{/* Space between = pb-32 only (8rem on desktop) */}
```

### Key Takeaway

**When user requests equal spacing:**
1. First check if sections with the same tone are stacked
2. Use `!pb-0` on the first section OR `!pt-0` on the second section
3. Do NOT attempt to calculate complex padding combinations
4. Do NOT move padding from Section to Container
5. Do NOT consolidate sections unless absolutely necessary

The `Section` component uses `py` (padding-top + padding-bottom). When two same-tone sections touch, you get double padding. The fix is always to eliminate padding on ONE side of the boundary.
