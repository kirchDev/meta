# Language-agnostic template for new repositories

Language-agnostic baseline template for new kirchDev repositories.

## why

Every new repository needs the same layer before the first line of project code exists: linting, formatting, commit hooks, CI, security scanning, dependency updates, issue templates and the usual meta documents. Assembled by hand that is half an hour, and by the third repository it has already drifted.

scaffold pins that layer down in one place. The project code itself can be anything — PHP, Go, Rust, Vue or shell — because the template contains none. It answers only the question of what a repository should ship with on day one.

## quickstart

```bash
gh repo create my-new-repo --template TitusKirch/scaffold
```

Or through "Use this template" on GitHub; after that only a handful of placeholders need replacing.

## features

- **Node and pnpm pinned** — the version lives in .nvmrc, engines and packageManager, so every contributor and CI runs the same one.
- **Linting and formatting via oxc** — oxlint and oxfmt behind a single check command, which CI runs too.
- **Commit hooks** — husky, lint-staged and commitlint enforce Conventional Commits before anything reaches the repository.
- **Dependency updates** — Dependabot groups minor and patch updates per ecosystem into one pull request; majors arrive separately.
- **Workflows** — lint and format check on pull requests, CodeQL on push, on pull requests and weekly.
- **Release automation** — release-please derives version and changelog from the commits, so a new repository can publish from its first commit.
- **Templates and meta documents** — issue forms, a pull-request checklist, licence, code of conduct, contributing and security guides.
- **Agent-ready** — CLAUDE.md and AGENTS.md are kept byte-identical, alongside a considered baseline permission policy.

## scope

The template owns the meta layer only. Application code, framework choices and project structure are deliberately left out — otherwise it would be a template for exactly one kind of project instead of all of them.
