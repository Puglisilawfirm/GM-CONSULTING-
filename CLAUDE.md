# CLAUDE.md — AI Assistant Guide for GM-CONSULTING

This file provides context and conventions for AI assistants (Claude, etc.) working in this repository.

## Project Overview

**Repository:** `Puglisilawfirm/GM-CONSULTING-`
**Purpose:** Corporate website for GM Consulting SRL — a strategic business consulting firm (Puglisi Law Firm). The site positions GM Consulting as a premium market leader in strategic consulting for Italian businesses.
**Tech Stack:** Static website — HTML5, CSS3, Vanilla JavaScript. No build tools or frameworks required.
**Language:** Italian (content), English (code comments and variable names).

## Repository Structure

```
GM-CONSULTING-/
├── CLAUDE.md              # AI assistant guide (this file)
├── index.html             # Main single-page website
├── css/
│   └── style.css          # All styles (premium gold/dark theme)
├── js/
│   └── main.js            # Interactivity (scroll, animations, form)
└── assets/
    └── images/            # Logo and image assets (add here)
```

## Brand Identity

- **Primary Color (Gold):** `#C8A951` — used for accents, CTAs, highlights
- **Dark Background:** `#1A1A2E` — hero, "why us" section, footer
- **White/Off-white:** `#FFFFFF` / `#FAFAFA` — content sections
- **Display Font:** Playfair Display (headings) — elegance and authority
- **Body Font:** Inter (text) — clean readability
- **Logo:** Puzzle pieces in gold and white with "GM CONSULTING.SRL" text
- **Tone:** Professional, authoritative, premium — positions GM Consulting as a VIP market leader

## Website Sections

1. **Navigation** — Fixed top bar with smooth scroll links, mobile hamburger menu
2. **Hero** — Full-viewport with tagline, CTA buttons, animated puzzle visual
3. **Chi Siamo** — Company introduction with animated stat counters (150+ clients, 98% satisfaction, 15+ years)
4. **Servizi** — 6 service cards: Strategia Aziendale, Ottimizzazione Processi, Finanza & Controllo, Organizzazione & HR, Trasformazione Digitale, Marketing Strategico
5. **Perché Noi** — 6 value propositions (numbered cards on dark background)
6. **Metodo** — 4-step timeline: Analisi, Strategia, Implementazione, Monitoraggio
7. **CTA Banner** — Conversion-focused call to action
8. **Contatti** — Contact form + company info (email, phone, address)
9. **Footer** — Brand, navigation links, service links, contact info

## Development Workflow

### Running Locally

This is a static site — no build step needed. Open `index.html` in a browser:

```bash
# Option 1: Direct file
open index.html

# Option 2: Simple HTTP server (Python)
python3 -m http.server 8000

# Option 3: Node.js
npx serve .
```

### Branch Strategy

- **`main`** — Production-ready code. Never push directly; use pull requests.
- **`claude/*`** — AI-assisted development branches (e.g., `claude/feature-name-<session-id>`).
- **Feature branches** — Use descriptive names: `feature/`, `fix/`, `chore/`, `docs/`.

### Git Conventions

- Write clear, descriptive commit messages in imperative mood (e.g., "Add contact form validation").
- Keep commits atomic — one logical change per commit.
- Always push with: `git push -u origin <branch-name>`
- On network failures, retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s).

### Pull Requests

- Provide a summary of changes and a test plan.
- Reference related issues when applicable.
- Request review before merging to `main`.

## Code Conventions

### HTML

- Semantic HTML5 elements (`<section>`, `<nav>`, `<footer>`, `<main>`).
- Each section has an `id` attribute for anchor navigation.
- SVG icons are inlined for performance (no external icon library).
- Classes follow BEM-like naming: `.service-card`, `.hero-title`, `.nav-link--cta`.

### CSS

- All styles in a single `css/style.css` file.
- CSS custom properties (variables) defined in `:root` for colors, fonts, shadows, transitions.
- Mobile-first responsive design with breakpoints at `1024px`, `768px`, and `480px`.
- Animations use CSS `@keyframes` and Intersection Observer–triggered `.reveal` / `.visible` classes.
- No CSS preprocessors or frameworks — pure CSS3.

### JavaScript

- Vanilla JavaScript in `js/main.js` — no frameworks or libraries.
- Key features: navbar scroll effect, mobile menu toggle, smooth scroll, scroll-reveal animations (Intersection Observer), animated stat counters, contact form handling, active nav highlighting.
- Event listeners use `{ passive: true }` on scroll events for performance.
- Form submission is currently simulated — replace the `setTimeout` in the submit handler with an actual API endpoint or email service.

### General

- Prefer clarity over cleverness.
- Keep functions small and focused on a single responsibility.
- Use meaningful, descriptive variable and function names.
- Avoid over-engineering — solve the current problem, not hypothetical future ones.

### Security

- Never commit secrets, API keys, or credentials.
- Use environment variables for sensitive configuration.
- Add `.env` files to `.gitignore`.
- Validate all external input at system boundaries.
- Contact form includes GDPR consent note.

## Customization Notes

Items that need updating with real company data:

- **Phone number:** Currently `+39 XXX XXX XXXX` in `index.html` (search for "XXX")
- **Address:** Currently "Italia" — update with full address
- **P.IVA:** Currently `XXXXXXXXXXX` in the footer
- **Email:** Currently `info@gmconsulting.it` — confirm correct address
- **Logo image:** Place the actual logo file in `assets/images/` and add an `<img>` tag in the nav and hero
- **Contact form backend:** The form currently simulates submission — connect to an email service (e.g., Formspree, EmailJS, or custom API)
- **Stats:** Verify the numbers (150+ clients, 98% satisfaction, 15+ years)

## AI Assistant Guidelines

When working in this repository, AI assistants should:

1. **Read before writing** — Always read existing files before modifying them.
2. **Minimize file creation** — Prefer editing existing files over creating new ones.
3. **Stay focused** — Only make changes that are directly requested or clearly necessary.
4. **Preserve brand identity** — Maintain the gold/dark/white color scheme and premium tone.
5. **Keep it static** — Do not introduce build tools or frameworks unless explicitly requested.
6. **Italian content** — All user-facing text must be in Italian. Code remains in English.
7. **Responsive first** — Test and maintain responsiveness across all breakpoints.
8. **No unnecessary additions** — Don't add comments, docstrings, or type annotations to unchanged code.
9. **Keep CLAUDE.md updated** — When adding new pages, sections, or significant features, update this file.
10. **Commit carefully** — Only commit when explicitly asked; use descriptive messages.
11. **Never commit secrets** — Check for `.env` files, credentials, or API keys before staging.

## Maintenance

This file should be kept up to date as the project evolves. Key triggers for updating:

- New pages or sections added to the website
- Contact form backend is configured
- Real company data replaces placeholders
- Analytics or tracking is added
- Domain and hosting are configured
- SEO metadata is updated
- New assets (images, fonts) are added
