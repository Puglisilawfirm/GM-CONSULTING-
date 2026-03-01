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
├── index.html             # Main single-page website (~844 lines)
├── css/
│   └── style.css          # All styles (~1577 lines, premium gold/dark theme)
└── js/
    └── main.js            # Interactivity (~133 lines, scroll, animations, form)
```

**Note:** No `assets/` directory exists yet. When adding images (logo, etc.), create `assets/images/` and place files there. No `.gitignore` exists — create one before adding any `.env` files or build artifacts.

## Brand Identity

### Color Palette (CSS Custom Properties)

| Variable            | Value       | Usage                                      |
|---------------------|-------------|---------------------------------------------|
| `--gold`            | `#C8A951`   | Primary accent, CTAs, highlights            |
| `--gold-light`      | `#D4BA6A`   | Hover states, lighter accents               |
| `--gold-dark`       | `#A88B3D`   | Hover/active states on gold elements        |
| `--dark`            | `#1A1A2E`   | Hero, Sistema GM section, footer            |
| `--dark-light`      | `#24243E`   | Gradient endpoints, CTA banner              |
| `--dark-medium`     | `#2D2D4A`   | Intermediate dark tones                     |
| `--charcoal`        | `#333333`   | Body text color                             |
| `--gray`            | `#6B7280`   | Secondary text, descriptions                |
| `--gray-light`      | `#9CA3AF`   | Tertiary text, placeholders, sources        |
| `--gray-lighter`    | `#F3F4F6`   | Light background variant                    |
| `--white`           | `#FFFFFF`   | Content section backgrounds                 |
| `--off-white`       | `#FAFAFA`   | Alternate section backgrounds               |
| `--red-muted`       | `#DC2626`   | Risk tags, failure mode indicators          |
| `--green-muted`     | `#16A34A`   | Deliverable tags, success states            |

### Typography

- **Display Font:** `--font-display` — Playfair Display (headings) — authority and precision
- **Body Font:** `--font-body` — Inter (text) — clean readability
- **Mono Font:** `--font-mono` — JetBrains Mono (labels, tech tags, section labels) — technical credibility
- Fonts loaded via Google Fonts with `preconnect` for performance

### Design Tokens

- **Shadows:** `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-gold`
- **Border radius:** `--radius` (8px), `--radius-lg` (16px)
- **Transition:** `--transition` — `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### Brand Rules

- **Logo:** Text-based "GM CONSULTING.SRL" with gold accent (`.logo-gm`, `.logo-consulting`, `.logo-srl`)
- **Tone:** Rigorous, evidence-based, fiduciary. No "corporate fluff". Every claim must be demonstrable, every promise must have an accountability mechanism.
- **Banned Phrases:** "architetti della crescita", "soluzioni su misura", "team d'eccellenza", "visione internazionale", "passione per", "sinergie", "paradigm shift"

## Website Sections & HTML IDs

| #  | Section               | HTML `id`      | CSS Class                | Nav Link |
|----|-----------------------|----------------|--------------------------|----------|
| 1  | Navigation            | `navbar`       | `.navbar`                | —        |
| 2  | Hero                  | `hero`         | `.hero`                  | Logo     |
| 3  | Il Problema           | `problema`     | `.section--problema`     | Yes      |
| 4  | Campi di Intervento   | `intervento`   | `.section--intervento`   | Yes      |
| 5  | Sistema GM            | `sistema`      | `.section--sistema`      | Yes      |
| 6  | CTA Banner            | *(none)*       | `.section--cta`          | No       |
| 7  | Proof Points          | `proof`        | `.section--proof`        | Yes      |
| 8  | Assessment Iniziale   | `assessment`   | `.section--assessment`   | Yes (CTA)|
| 9  | Footer                | *(none)*       | `.footer`                | —        |

### Section Details

1. **Navigation** (`#navbar`) — Fixed top bar with smooth scroll links, mobile hamburger menu (`.nav-toggle` / `.nav-menu.open`). Adds `.scrolled` class on scroll > 60px.
2. **Hero** (`#hero`) — Provocative question headline ("Perché le aziende italiane spendono milioni in strategia e zero in esecuzione tecnica?"), methodology subtitle, trust indicators (legal review, SLA, monitoring), architecture diagram visual (Risk → Legal → Auto → Monitor with feedback loop). Diagram hidden on ≤1024px.
3. **Il Problema** (`#problema`) — Problem-first approach with verified statistics (73% failure rate, 4.2x ROI), methodology sources, failure modes panel (dark background) showing 4 common risk patterns with red dot indicators.
4. **Campi di Intervento** (`#intervento`) — 6 service cards in 2-column grid, each with Risk/Protocol/Deliverable structure and tech tags:
   - Compliance Strategica & Business Planning
   - Automazione & Ottimizzazione Processi
   - Finanza, Controllo & Modellazione Predittiva
   - Governance & Architettura Organizzativa
   - Legal Tech & Trasformazione Digitale
   - Healthcare & Emergency Management
5. **Sistema GM** (`#sistema`) — 4-phase flow diagram on dark background with feedback loops:
   - Phase 01: Due Diligence Strategica (72-96 ore)
   - Phase 02: Prototyping & Scenario Analysis (2-3 settimane)
   - Phase 03: Implementation Binding (4-8 settimane, with SLAs)
   - Phase 04: Algorithmic Monitoring (ongoing)
   - Includes continuous feedback loop visualization
6. **CTA Banner** (no `id`) — Conversion-focused with compliance audit angle, dark gradient background with gold radial overlay.
7. **Proof Points** (`#proof`) — 3 anonymized micro case studies in 3-column grid with verified metrics and measurement methodology; nested "Competenze Rare" panel (dark background, 4 expertise combinations in 2-column grid).
8. **Assessment Iniziale** (`#assessment`) — 2-column layout: left side has contact details + GDPR privacy value proposition; right side has structured assessment form (not generic contact).
9. **Footer** — 4-column grid: brand column, navigation links, service links, contact info. Footer bottom has copyright and P.IVA.

### Assessment Form Fields

| Field       | Type       | `id`/`name`  | Required | Notes                                           |
|-------------|------------|--------------|----------|-------------------------------------------------|
| Nome        | `text`     | `name`       | Yes      | Full name                                       |
| Email       | `email`    | `email`      | Yes      | Business email                                  |
| Azienda     | `text`     | `company`    | Yes      | Company name (ragione sociale)                  |
| Ruolo       | `text`     | `role`       | No       | Job title (CEO, CFO, COO...)                    |
| Settore     | `select`   | `sector`     | Yes      | 5 options: Healthcare, Maritime, Manufacturing, Services, Other |
| Problema    | `textarea` | `problem`    | Yes      | Problem description (4 rows)                    |
| Urgenza     | `select`   | `urgency`    | No       | 3 options: Critica, Pianificata, Esplorativa    |

Form submission is currently **simulated** — see `js/main.js:93` (`setTimeout` handler). Replace with actual API endpoint.

## SEO & Schema.org

- **Schema.org markup:** Two JSON-LD blocks in `<head>`:
  - `Organization` — name, description, URL (`https://gmconsulting.one`), email, address (IT), `knowsAbout` array
  - `ItemList` of 6 `Service` entries — one per "Campo di Intervento"
- **Open Graph:** `og:title`, `og:description`, `og:type` (website), `og:locale` (it_IT)
- **Meta keywords:** "consulenza strategica healthcare compliance Italia", "business plan TAR-proof", "emergency management porti digitalizzazione", "legal tech consulting", "compliance preventiva", "automazione processi aziendali", "risk management operativo", "consulenza diritto amministrativo imprese"
- **Meta description:** Focuses on risk reduction, legal precision, and automation
- **Domain:** `gmconsulting.one` (referenced in Schema.org `url` field)

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

- **`master`** — Production-ready code. Never push directly; use pull requests.
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

- All styles in a single `css/style.css` file (~1577 lines).
- CSS custom properties (variables) defined in `:root` — see Brand Identity section for full inventory.
- Desktop-first responsive design with media query breakpoints:
  - `@media (max-width: 1024px)` — Tablet: hero to single-column, hide architecture diagram, stack grids
  - `@media (max-width: 768px)` — Mobile: show hamburger menu (`.nav-toggle`), reduce section padding, stack form rows
  - `@media (max-width: 480px)` — Small mobile: reduce container padding, shrink hero title, stack CTA buttons vertically
- Animations:
  - `@keyframes fadeUp` — Hero content entrance animation with staggered delays (0.2s–1s)
  - `@keyframes pulse-ring` — Hero background decorative animation (8s/10s cycles)
  - `@keyframes scroll-bounce` — Scroll indicator animation (2s cycle)
  - `.reveal` / `.visible` classes — Intersection Observer–triggered scroll reveal (30px translateY, 0.7s transition)
- No CSS preprocessors or frameworks — pure CSS3.
- Service cards use Risk/Protocol/Deliverable tag system: `.service-tag--risk` (red), `.service-tag--protocol` (gold), `.service-tag--deliver` (green).
- Tech tags (`.tech-tag`) use monospace font on off-white background for technical credibility.
- Button system: `.btn` base + `.btn-primary` (gold), `.btn-outline` (transparent), `.btn-lg`, `.btn-full` modifiers.

### JavaScript

- Vanilla JavaScript in `js/main.js` (~133 lines) — no frameworks or libraries.
- All code wrapped in `DOMContentLoaded` listener.
- Key features (in order of appearance in file):
  1. **Navbar scroll effect** — Adds `.scrolled` class to `#navbar` when `scrollY > 60`
  2. **Mobile menu toggle** — Toggles `.active` on `#navToggle` and `.open` on `#navMenu`, locks body scroll
  3. **Smooth scroll** — Intercepts all `a[href^="#"]` clicks, calculates offset accounting for navbar height
  4. **Scroll-reveal** — `IntersectionObserver` (threshold: 0.1, rootMargin: -40px bottom) adds `.visible` to `.reveal` elements, with fallback for unsupported browsers
  5. **Contact form** — Simulated submission on `#contactForm` with button state changes (replace `setTimeout` at line 93 with actual API)
  6. **Active nav highlighting** — Updates `.active` class on `.nav-link` elements based on scroll position
- Event listeners use `{ passive: true }` on scroll events for performance.

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

- **Phone number:** Currently `+39 XXX XXX XXXX` — appears in footer contact section (`index.html:830`) and likely in Schema.org
- **Address:** Currently "Italia" (`index.html:831`) — update with full street address; also update Schema.org `PostalAddress` (`index.html:28-31`)
- **P.IVA:** Currently `XXXXXXXXXXX` in footer bottom (`index.html:837`)
- **Email:** Currently `info@gmconsulting.it` — appears in footer (`index.html:829`), Schema.org Organization (`index.html:27`), and contact section
- **Logo image:** Currently text-only. To add a logo: create `assets/images/` directory, place logo file, add `<img>` tag in `.nav-logo` (both navbar and footer instances)
- **Assessment form backend:** Form at `#contactForm` currently simulates submission via `setTimeout` in `js/main.js:93` — connect to an email service (e.g., Formspree, EmailJS, or custom API)
- **Case study details:** Proof Points section (`#proof`) uses 3 anonymized case studies (Emergency Management, Healthcare Compliance, Business Planning) — can be updated with client-approved specifics
- **Statistics:** The "73%" and "4.2x" figures in Il Problema section cite "Analisi interna su 150+ progetti di consulenza strategica in Italia" — verify and update sources as needed
- **Open Graph image:** No `og:image` meta tag exists — add one when a social sharing image is available
- **Favicon:** No favicon configured — add `<link rel="icon">` when available
- **`.gitignore`:** Does not exist — create before adding any `.env` files, node_modules, or build output

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
- Assessment form backend is configured (currently simulated)
- Real company data replaces placeholders (phone, P.IVA, address)
- Analytics or tracking is added (none currently)
- Domain and hosting are configured (currently on Vercel with `gmconsulting.one`)
- SEO metadata is updated (Open Graph image, favicon missing)
- New assets (images, fonts) are added
- Case studies or proof points are added/updated
- `.gitignore` is created
- New CSS custom properties or design tokens are introduced
- JavaScript functionality is added or form backend is connected
- Schema.org structured data is modified
