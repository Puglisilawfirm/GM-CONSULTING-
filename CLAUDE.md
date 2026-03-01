# CLAUDE.md — AI Assistant Guide for GM-CONSULTING

This file provides context and conventions for AI assistants (Claude, etc.) working in this repository.

## Project Overview

**Repository:** `Puglisilawfirm/GM-CONSULTING-`
**Purpose:** GM Consulting project repository for Puglisi Law Firm.
**Status:** Newly initialized — foundational setup in progress.

## Repository Structure

```
GM-CONSULTING-/
├── CLAUDE.md          # AI assistant guide (this file)
└── .git/              # Git version control
```

> **Note:** This repository is in its initial state. Update this section as the project structure evolves.

## Development Workflow

### Branch Strategy

- **`main`** — Production-ready code. Never push directly; use pull requests.
- **`claude/*`** — AI-assisted development branches (e.g., `claude/feature-name-<session-id>`).
- **Feature branches** — Use descriptive names: `feature/`, `fix/`, `chore/`, `docs/`.

### Git Conventions

- Write clear, descriptive commit messages in imperative mood (e.g., "Add user authentication module").
- Keep commits atomic — one logical change per commit.
- Always push with: `git push -u origin <branch-name>`
- On network failures, retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s).

### Pull Requests

- Provide a summary of changes and a test plan.
- Reference related issues when applicable.
- Request review before merging to `main`.

## Commands

> Update this section as build tooling is added to the project.

```bash
# Example placeholders — replace with actual commands once configured
# npm install        # Install dependencies
# npm run dev        # Start development server
# npm run build      # Production build
# npm test           # Run test suite
# npm run lint       # Run linter
```

## Code Conventions

### General

- Prefer clarity over cleverness.
- Keep functions small and focused on a single responsibility.
- Use meaningful, descriptive variable and function names.
- Avoid over-engineering — solve the current problem, not hypothetical future ones.

### File Organization

- Group related files by feature or domain, not by type.
- Keep configuration files at the project root.
- Place shared utilities in a dedicated directory (e.g., `src/utils/` or `lib/`).

### Security

- Never commit secrets, API keys, or credentials.
- Use environment variables for sensitive configuration.
- Add `.env` files to `.gitignore`.
- Validate all external input at system boundaries.

## Environment Setup

> Update this section once the tech stack and tooling are established.

1. Clone the repository.
2. Install dependencies (once a package manager is configured).
3. Copy `.env.example` to `.env` and fill in required values (once created).
4. Start the development server.

## AI Assistant Guidelines

When working in this repository, AI assistants should:

1. **Read before writing** — Always read existing files before modifying them.
2. **Minimize file creation** — Prefer editing existing files over creating new ones.
3. **Stay focused** — Only make changes that are directly requested or clearly necessary.
4. **Preserve existing patterns** — Match the style and conventions already present in the codebase.
5. **No unnecessary additions** — Don't add comments, docstrings, or type annotations to unchanged code.
6. **Keep CLAUDE.md updated** — When adding new tooling, scripts, or significant structure, update this file.
7. **Test changes** — Run available tests and linters before committing.
8. **Commit carefully** — Only commit when explicitly asked; use descriptive messages.
9. **Never commit secrets** — Check for `.env` files, credentials, or API keys before staging.

## Maintenance

This file should be kept up to date as the project evolves. Key triggers for updating:

- New frameworks or libraries added
- Build/test/lint commands change
- Directory structure changes significantly
- New environment variables are introduced
- CI/CD pipelines are configured
- Coding conventions are established or modified
