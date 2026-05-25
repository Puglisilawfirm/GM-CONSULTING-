# CLAUDE.md — AI Assistant Guide for GM-CONSULTING

This file provides context and conventions for AI assistants (Claude, etc.) working in this repository.

## Project Overview

**Repository:** `Puglisilawfirm/GM-CONSULTING-`
**Purpose:** Corporate website for GM Consulting SRL — a tech-enabled risk architecture firm. The site positions GM Consulting as a specialist in reducing operational risk through legal precision and automation, serving Italian businesses in healthcare compliance, maritime operations, strategic planning, and digital transformation.
**Tech Stack:** Static website — HTML5, CSS3, Vanilla JavaScript. No build tools or frameworks required.
**Language:** Italian (content), English (code comments and variable names).
**Positioning:** "Tech-Enabled Risk Architecture" — not generic strategic consulting. The differentiator is the intersection of administrative law, process automation (Python), and cloud architecture.

## Repository Structure

```
GM-CONSULTING-/
├── CLAUDE.md              # AI assistant guide (this file)
├── index.html             # Main single-page website
├── compliance.html        # Area Compliance & Certificazioni ISO/UNI
├── css/
│   └── style.css          # All styles (premium black + gold theme)
├── js/
│   └── main.js            # Interactivity (scroll, animations, form)
└── assets/
    └── images/            # Logo and image assets (add here)
```

## Brand Identity

- **Primary Color (Gold):** `#C8A951` — used for accents, CTAs, highlights
- **Black Background:** `#000000` / `#050505` / `#0D0D0D` — all dark sections (pure black, NOT navy blue)
- **Off-white:** `#F7F7F5` — used sparingly; the site is dark-first premium
- **Display Font:** Playfair Display (headings) — authority and precision
- **Body Font:** Inter (text) — clean readability
- **Mono Font:** JetBrains Mono (labels, tech tags, section labels) — technical credibility
- **Logo:** Text-based "GM CONSULTING.SRL" with gold accent
- **Tone:** Rigorous, evidence-based, fiduciary. No "corporate fluff". Every claim must be demonstrable, every promise must have an accountability mechanism.
- **Banned Phrases:** "architetti della crescita", "soluzioni su misura", "team d'eccellenza", "visione internazionale", "passione per", "sinergie", "paradigm shift"

## Website Sections

1. **Navigation** — Fixed top bar with smooth scroll links, mobile hamburger menu
2. **Hero** — Provocative question headline ("Perché le aziende italiane spendono milioni in strategia e zero in esecuzione tecnica?"), methodology subtitle, trust indicators, architecture diagram visual
3. **Il Problema** — Problem-first approach with verified statistics (with methodology sources), failure modes panel showing common risk patterns
4. **Campi di Intervento** — 6 service cards, each with Risk/Protocol/Deliverable structure and tech tags:
   - Compliance Strategica & Business Planning
   - Automazione & Ottimizzazione Processi
   - Finanza, Controllo & Modellazione Predittiva
   - Governance & Architettura Organizzativa
   - Legal Tech & Trasformazione Digitale
   - Healthcare & Emergency Management
5. **Sistema GM** — 4-phase flow diagram with feedback loops:
   - Due Diligence Strategica
   - Prototyping & Scenario Analysis
   - Implementation Binding (with SLAs)
   - Algorithmic Monitoring
6. **CTA Banner** — Conversion-focused with compliance audit angle
7. **Proof Points** — Anonymized micro case studies with verified metrics and measurement methodology; "Competenze Rare" section showing unique expertise combinations
8. **Assessment Iniziale** — Structured assessment form (not generic contact), GDPR as value element
9. **Footer** — Brand, navigation links, service links, contact info

## SEO & Schema.org

- **Schema.org markup:** `Organization` and `Service` (ItemList) structured data in JSON-LD
- **Long-tail keywords:** "consulenza strategica healthcare compliance Italia", "business plan TAR-proof", "emergency management porti digitalizzazione", "legal tech consulting", "compliance preventiva"
- **Meta description:** Focuses on risk reduction, legal precision, and automation

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
- Schema.org JSON-LD in `<head>` for Organization and Service structured data.

### CSS

- All styles in a single `css/style.css` file.
- CSS custom properties (variables) defined in `:root` for colors, fonts, shadows, transitions.
- Mobile-first responsive design with breakpoints at `1024px`, `768px`, and `480px`.
- Animations use CSS `@keyframes` and Intersection Observer–triggered `.reveal` / `.visible` classes.
- No CSS preprocessors or frameworks — pure CSS3.
- Service cards use Risk/Protocol/Deliverable visual structure with colored tags.
- Tech tags use monospace font for technical credibility.

### JavaScript

- Vanilla JavaScript in `js/main.js` — no frameworks or libraries.
- Key features: navbar scroll effect, mobile menu toggle, smooth scroll, scroll-reveal animations (Intersection Observer), contact form handling, active nav highlighting.
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
- Assessment form includes GDPR consent note with consultant-client privilege messaging.

## Customization Notes

Items that need updating with real company data:

- **Phone number:** Currently `+39 XXX XXX XXXX` in `index.html` (search for "XXX")
- **Address:** Currently "Italia" — update with full address
- **P.IVA:** Currently `XXXXXXXXXXX` in the footer
- **Email:** Currently `info@gmconsulting.it` — confirm correct address
- **Logo image:** Place the actual logo file in `assets/images/` and add an `<img>` tag in the nav
- **Assessment form backend:** The form currently simulates submission — connect to an email service (e.g., Formspree, EmailJS, or custom API)
- **Case study details:** Proof Points section uses anonymized case studies — can be updated with client-approved specifics
- **Statistics:** The 73% and 4.2x figures cite internal analysis — verify and update sources as needed

## AI Assistant Guidelines

When working in this repository, AI assistants should:

1. **Read before writing** — Always read existing files before modifying them.
2. **Minimize file creation** — Prefer editing existing files over creating new ones.
3. **Stay focused** — Only make changes that are directly requested or clearly necessary.
4. **Preserve brand identity** — Maintain the gold/dark/white color scheme and rigorous, evidence-based tone.
5. **Keep it static** — Do not introduce build tools or frameworks unless explicitly requested.
6. **Italian content** — All user-facing text must be in Italian. Code remains in English.
7. **Responsive first** — Test and maintain responsiveness across all breakpoints.
8. **No unnecessary additions** — Don't add comments, docstrings, or type annotations to unchanged code.
9. **Keep CLAUDE.md updated** — When adding new pages, sections, or significant features, update this file.
10. **Commit carefully** — Only commit when explicitly asked; use descriptive messages.
11. **Never commit secrets** — Check for `.env` files, credentials, or API keys before staging.
12. **No corporate fluff** — Never use banned phrases. Every claim must be verifiable. Follow the "procedural fairness" voice.
13. **Risk/Protocol/Deliverable** — When adding services, follow the established structure with tech tags.

## Maintenance

This file should be kept up to date as the project evolves. Key triggers for updating:

- New pages or sections added to the website
- Assessment form backend is configured
- Real company data replaces placeholders
- Analytics or tracking is added
- Domain and hosting are configured (currently on Vercel with gmconsulting.one)
- SEO metadata is updated
- New assets (images, fonts) are added
- Case studies or proof points are added/updated
