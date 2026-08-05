# Language-agnostic template for new repositories

Everything a repository needs on day one, from linting and commit hooks to CI, security scanning and the usual meta documents, without prescribing a single line of project code.

## why

Before real work starts in a new repository, the same meta layer has to be in place, and assembled by hand it drifts apart between one repository and the next. Each repository then checks something slightly different, and a fix to the layer only reaches the one it was made in.

scaffold bundles that layer into a template repository. The project code itself can be anything, be it PHP, Go, Rust, Vue or shell, because the template contains none. It answers only the question of what a repository should ship with on day one.

## quickstart

```bash
gh repo create my-new-repo --template TitusKirch/scaffold
```

Or through "Use this template" on GitHub; the README lists the placeholders to replace afterwards.

## features

- **Node and pnpm pinned** — Node through .nvmrc and engines, pnpm through packageManager, so every contributor and CI runs the same version.
- **Linting and formatting via oxc** — oxlint and oxfmt behind one shared check command; CI runs the same checks.
- **Commit hooks** — husky, lint-staged and commitlint enforce Conventional Commits before anything reaches the repository.
- **Dependency updates** — Dependabot groups minor and patch updates per ecosystem into one pull request; majors arrive separately.
- **CodeQL** — security analysis on push, on pull requests and weekly.
- **Release automation** — release-please derives version and changelog from the commit history instead of by hand.
- **Templates and meta documents** — issue forms, a pull-request checklist, licence, code of conduct, contributing and security guides.
- **Agent-ready** — CLAUDE.md and AGENTS.md are kept byte-identical, plus a baseline permission policy for Claude Code and Codex whose parity CI checks.

## scope

The template owns the meta layer only. Application code, framework choices and project structure are left out. Otherwise it would be a template for exactly one kind of project instead of all of them.
