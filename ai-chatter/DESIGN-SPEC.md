# AI Chatter — Design Spec

## Style Reference: Synthesia

Clean, professional SaaS aesthetic. Navy + white primary palette. Generous whitespace. Cards with soft shadows. Confident typography. Trust signals prominent.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Navy 900 | `#0f1b2d` | Primary dark / hero bg |
| Navy 800 | `#162040` | Nav scrolled bg |
| Navy 700 | `#1e3a5f` | Headings |
| Navy 600 | `#2563eb` | Primary accent / buttons |
| Navy 100 | `#e0ecff` | Light accent bg |
| White | `#ffffff` | Page bg, cards |
| Slate 50 | `#f8fafc` | Alt section bg |
| Slate 400 | `#94a3b8` | Muted text |
| Slate 600 | `#475569` | Body text |
| Green 500 | `#22c55e` | Success / CTA secondary |
| Violet 500 | `#8b5cf6` | Accent highlight |

## Typography

- **Headings:** Inter (700 weight), tight letter-spacing
- **Body:** Inter (400), 1.6 line-height
- **Hero h1:** 4rem desktop, 2.5rem mobile
- **Section h2:** 2.5rem desktop, 1.75rem mobile

## Layout

### Navigation
- Fixed top, transparent → white on scroll
- Logo left | Nav links center | CTA buttons right
- Mobile: hamburger → slide-out

### Hero
- Full-width, navy gradient bg
- Left: headline + subtitle + 2 CTAs + trust badges
- Right: product mockup / illustration area
- Generous padding (8rem top, 6rem bottom)

### Sections
- Alternating white / slate-50 backgrounds
- Max-width 1200px container centered
- Section padding: 5rem vertical
- Section headers: tag pill + h2 + subtitle, centered

### Cards
- White bg, 1px border slate-200
- border-radius: 16px
- Soft shadow: `0 4px 24px rgba(0,0,0,0.06)`
- Hover: translateY(-4px) + stronger shadow
- Padding: 2rem

### Buttons
- Primary: navy-600 bg, white text, rounded-full, px-8 py-3
- Secondary: transparent, border navy-600, navy text
- Hover: darken + lift + shadow

## Components

1. **Logo** — "AI Chatter" text mark, Inter bold, with chat bubble icon
2. **Nav** — logo | Features · Pricing · About | "Sign In" ghost + "Get Started" primary
3. **Hero** — headline + sub + CTAs + trust row (logos or stats)
4. **Features grid** — 3-col cards with icons
5. **Social proof** — stats bar or logo cloud
6. **CTA section** — dark bg, centered headline + button
7. **Footer** — 4-col links + copyright
