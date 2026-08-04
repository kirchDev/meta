# CLAUDE.md

This file provides guidance to AI coding agents — Claude Code (claude.ai/code) and vendor-neutral tools such as Codex, OpenCode, Cursor, and Copilot — when working with code in this repository.

## Agent instruction files

`CLAUDE.md` and `AGENTS.md` are kept **byte-identical**. `CLAUDE.md` is what Claude Code reads; `AGENTS.md` is what vendor-neutral agent tools read — Codex, OpenCode, Cursor, Copilot, and whatever follows them. Two real files, deliberately not a symlink: not every tool resolves one.

**After editing either file, copy it over the other — don't repeat the edit by hand:**

```bash
cp CLAUDE.md AGENTS.md   # or the reverse, whichever you just edited
```

Retyping a change is exactly how the two drift; one reflowed line or reworded clause is enough. `diff CLAUDE.md AGENTS.md` must print nothing. If it ever does, treat it as a defect and fix it by letting one file win wholesale — never by merging them.

## What this repo is

`kirchDev/meta` is the **source of the projects listed on kirch.dev/projekte**. It is data and a build, not an application: curated entries committed by hand, live repository facts fetched from the GitHub API, assembled by CI into a single `projects.json` that the site fetches.

There is no UI here, and there must not be. The page lives in `kirchDev/app`.

### The three-way split

Everything about a project falls into exactly one of these, and the split is the whole design:

| What                                                        | Lives in                | Changes by                              |
| :---------------------------------------------------------- | :---------------------- | :-------------------------------------- |
| **Facts** — licence, stars, last push, archived             | GitHub API              | The sync workflow, daily + on dispatch  |
| **Editorial** — category, technologies, prose, code samples | Here, by hand           | A commit                                |
| **Presentation** — labels, icons, colours, layout           | `kirchDev/app`          | A deploy                                |

Category and technology travel as **keys** (`cli`, `typescript`), never as labels. What `cli` is called in German, which icon it gets, what colour its accent line is — all of that is presentation and belongs to the app's `locales/` and `constants/projects.ts`. Putting a label here would mean maintaining it in two places, and the German UI would silently start showing whatever this repo happened to say.

### Why a repository of its own

Content that changes independently of code should not hang off a code release. In `kirchDev/app` a new project would have to travel the full release path (PR → main → release → deploy) although no code changed. A database would want an admin UI, auth, migrations, seeding, backups — a lot of apparatus for a two-digit number of entries, and the content would lose its code review.

The decisive benefit is different though: **the GitHub token moves out of the web app and into an Actions secret.** A publicly reachable application then needs none at all.

## Commands

| Command           | What it does                                                            |
| :---------------- | :---------------------------------------------------------------------- |
| `pnpm install`    | Install deps and wire husky hooks via the `prepare` script              |
| `pnpm check`      | `lint` + `format` + `typecheck` + `validate` — the CI gate              |
| `pnpm validate`   | Schema **and** cross-file checks over every entry. Offline              |
| `pnpm build`      | Fetches GitHub facts and writes `projects.json`. Needs network          |
| `pnpm typecheck`  | `tsc --noEmit`                                                          |
| `pnpm lint`       | `oxlint . --deny-warnings`                                              |
| `pnpm format`     | `oxfmt --check .` (note: `format` is the check, not the fix)            |
| `pnpm check:fix`  | Auto-fix lint + format                                                  |
| `pnpm taze`       | Interactive dependency upgrade check                                    |

There is no test suite. `pnpm validate` is what stands in for one, and it is the command to run after touching anything under `projects/` or `schema/`.

## Layout

```
projects/<owner>/<slug>/     one directory per entry — the directory IS the entry
  project.json               facets only: kind, category, technologies, links
  de.md, en.md               everything readable: tagline, summary, sections
schema/project.schema.json   the authority for what project.json may contain
scripts/                     projects.ts (loading + parsing), validate.ts, build.ts
projects.json                GENERATED — the file the app fetches. Never edit by hand
```

`projects/<owner>/<slug>/` mirrors the forgemap layout, so a path here matches the local clone and the GitHub URL.

**Owner and slug come from the path, not from `project.json`.** A field restating what the path already says is a field that can disagree with it — and the sync would then fetch one repository while the page links another. The same reasoning keeps the GitHub link out of `links`: it is derived, and `pnpm validate` rejects it if listed.

**The directory is the act of inclusion.** There is no topic scanning, no discovery. A project appears on the page because someone created a directory for it, which makes the default "does not appear" rather than "appears by accident".

## Adding a project

1. `mkdir -p projects/<owner>/<slug>` — the slug is the repository name.
2. Write `project.json`. Point `$schema` at `../../../schema/project.schema.json` so the editor completes the enums.
3. Write `de.md` and `en.md`. **Both are mandatory** — a missing file is an error, not a fallback to the other language.
4. `pnpm validate`.

`project.json` holds only what the page filters on. Everything a reader actually sees lives in the locale files.

`kind`, `category`, `maturity`, `activity`, `technologies` and `links[].type` are **closed vocabularies** enforced by the schema. Extending one is a deliberate edit to `schema/project.schema.json`, and that is the point: a free string list turns one typo into a second filter chip on the page — `TypeScript` and `Typescript` side by side, no error, nothing to notice. This is the single reason the schema exists; don't loosen it.

> [!IMPORTANT]
> **`technologies` is a copy of `app/Enums/Technology.php` in `kirchDev/app`** — the same 43 keys, and that enum is the original. A technology has to exist there first; adding one only here ships a key the app cannot label or give an icon to. Keep the two in step, and never invent a key: it is `node`, not `nodejs`, and `tailwind-css`, not `tailwind`.
>
> A new `category` likewise needs a label in the app's `locales/<lang>/projects.json` and an accent colour in `constants/projects.ts` before it renders.

### The `.md` format

Markdown's own structure, not YAML front matter. A file is a shortened README for the project, and it is the same shape for every project:

````markdown
# <tagline>

<summary — its first paragraph is the description a card shows>

## why

<why the thing exists; the problem it answers>

## quickstart

```bash
<the project in one command>
```

<a line saying what that shows>

## features

- **<Term>** — <one line>
- **<Term>** — <another>

## scope

<what it deliberately does not do>

## install

```bash
<installation>
```
````

**A `##` heading is a KEY, not a title.** "Quickstart" and "Schnellstart" are the same section — what it is *called* lives in the app's locale files beside the category names, exactly as with `category` and `technologies`. That is why the keys are lowercase English words and never translated.

The canonical order is **`why` → `quickstart` → `features` → `scope` → `install`**. Every section is optional (not every project has a command to show), but a file has to keep them in that order — the page renders in canonical order, so a differently-ordered file would read differently from the page it produces. `pnpm validate` rejects it.

Inside a section anything goes, in any order: paragraphs, `- **Term** — text` lists, fenced code. They all become **blocks**, which is the one currency of the readable content. A code fence carries only its language: it needs no role, because the section it sits in already says whether it is an installation command or a sample.

Front matter was rejected deliberately: it would put German prose inside YAML, where a tagline holding a colon — `CLI: das Werkzeug` — silently becomes a mapping or a parse error. Here a colon is just a colon.

**The prose is plain text.** The app renders it without a Markdown renderer, so emphasis or a link written here reaches the page as literal asterisks — don't write `` `backticks` `` in prose either. Exactly three things are structure rather than decoration, and so are parsed: the `##` keys, the fences, and the `**Term** —` of a list item, which arrives split into `{ term, text }`. A list item that uses `**` in any other shape is rejected rather than passed through.

Line wrapping is free; the parser collapses it. Content is shortened from the project's own README — emoji stripped, one line each.

### What belongs in `features`

**Only what the project does for the reader.** The test is "what do I get from this?" — if the honest answer is "nothing, that is a fact about the project", it does not belong there. Three kinds keep creeping in and have all been removed once already:

- **Project structure** — "built as a monorepo", "documentation maintained in-repo". True, and no use to anyone deciding whether to use the thing.
- **Tech stack** — "built on Tauri", "Laravel at the core", "terraform-plugin-framework". This is what `technologies` in `project.json` is for, and the page already renders it as chips. Where the stack has a real consequence, name the consequence instead: not "built on Tauri" but "uses the OS-native WebView, so it stays small".
- **Distribution** — "published on both registries", "three install paths". `links` and the `install` section already say this.

A project that ends up with three honest features has three. Padding the list back to eight with facts about the repository is how the page stops being read.

### Why the readable content lives here and not in `project.json`

Because it is **not language-neutral**, and that includes the code:

```bash
bun add -g envprism
bunx envprism  # ohne Installation
```

That comment is German; its English counterpart reads `# without installing`. An earlier design held the samples in the shared `project.json` and made this inexpressible — German text ended up sitting in the supposedly neutral file. It also needed a `code: string[]` array to work around JSON having no multi-line string, and an id linking each block to a caption in another file. Moving everything readable into the locale files removed all three at once.

The cost is that each language repeats the sample, so the two could drift apart. `pnpm validate` closes that: the *content* of a block may differ between languages — that is the point — but the **structure may not**. Same sections in the same order, same blocks inside them, same number of list items.

## Lifecycle: two axes, not one set

Lifecycle sits beside `kind` and `category` — those say what a project *is*, this says where it stands. It is **two fields**, because the values are not of one type:

| Field      | Question                    | Values     | Omitted means |
| :--------- | :-------------------------- | :--------- | :------------- |
| `maturity` | How finished is it?         | `wip`      | stable         |
| `activity` | Is work happening?          | `paused`, `legacy` | actively maintained |

**Why two fields and not `status: ["wip", "paused"]`.** The axes are independent, so they combine freely — `wip` + `paused` is a real state (an early prototype currently resting), and so is `wip` + archived (unfinished, then abandoned). But `paused` and `legacy` sit on the *same* axis and contradict each other: one claims the work resumes, the other that it does not. A set would admit that pair; two fields make it unsayable, because only one value fits in the field. The build additionally rejects `activity: "paused"` on a repository GitHub reports as `archived`, since that is the same contradiction arriving from two sources. `maturity` is deliberately left out of that check.

**`legacy` is `archived`, except where there is no repository.** For a public repository the truth is GitHub's own `archived` flag, which `build.ts` reads. Writing `legacy` by hand as well would be a second truth free to disagree with the first — archiving the repository is the one action that makes it true everywhere at once (GitHub's UI, the API, the page). So the schema accepts `activity: "legacy"` **only** on a `github: false` entry, which has no repository to archive and therefore has to say so itself. Same shape as the `license` rule.

**On `paused`.** It is a claim about the future, and it ages against the author: left standing for years it reads as the opposite of what was meant — abandoned, but unadmitted. `updatedAt` already says how long a project has been quiet, verifiably and without upkeep. It exists because it was asked for; prefer letting the date speak.

Note that `TitusKirch/TitusKirch` models this differently: there `wip` / `paused` / `legacy` are *categories* beside `packages` and `tools`, mixing purpose and lifecycle on one axis — which is also why it cannot express two of them at once. Tolerable for a rendered README list; not the model here.

### Conditional rules read twice

`license` and `activity: "legacy"` are both conditional on `github`, expressed in the schema's `allOf` **and** restated as named checks in `validate.ts`. That duplication is on purpose: ajv reports a failed `if/then` as "must match then schema" plus a bare required-property complaint, neither of which says what is wrong. The validator drops errors whose `schemaPath` contains `/allOf/` and prints its own sentence instead. Changing one of these rules means changing both places.

## Private projects

**Private repositories are never read.** A private project gets an entry by hand with `"github": false`, which means:

- the sync never calls the API for it,
- it gets no repository link,
- `license` must be stated in the entry, because there is no repository to read it from,
- the page cannot tell that a repository exists behind it at all — it sees an entry without a GitHub button.

This is why no secret with access to private repositories exists anywhere in this repo. The built-in `GITHUB_TOKEN` reads public metadata, which is all the sync ever needs.

## The build

`scripts/build.ts` fetches facts for every `github: true` entry, merges the editorial content, and writes `projects.json`. Two properties matter:

- **`"downloads": true` makes it read the latest release too**, and write one entry per installer (platform, format, URL, size) plus the version. This has to be fetched, not committed: the asset names carry the version — `glimpse_0.12.2_x64-setup.exe` — so GitHub's `/releases/latest/download/<name>` shortcut does not apply, and a URL written into an entry would point at an old build the day after the next release. The daily sync keeps it current. An entry that claims downloads but has no release, or none the platform table recognises, fails the build rather than shipping an empty list.
- **It is all-or-nothing.** If any single API call fails, nothing is written and the run fails. A partial file is worse than a stale one: the app's fallback chain can serve the last good copy, but it cannot tell that a project vanished because one call errored.
- **`pnpm build` ends with `oxfmt projects.json`, and must.** `JSON.stringify` puts every array member on its own line; oxfmt keeps short ones inline. Without that step the build writes a file its own `pnpm format` gate then rejects, and every sync PR would open red.
- **It runs as a pull request, never a direct push.** `.github/workflows/sync-projects.yml` re-points `bot/sync-projects` at the current main tip and commits through the **Contents API** — commits made that way with `GITHUB_TOKEN` are signed by GitHub and count as *Verified*, which a `required_signatures` rule on main insists on. A plain `git push` would be rejected. `cleanup-sync-branch.yml` deletes the branch after the merge, since re-pointing means the merge never does.

The app fetches only the finished `projects.json` — no token, no rate limit, no knowledge of the API — and a scheduler command pulls it into the cache. **Fallback chain so the page is never empty:** cache → last known state → a copy shipped inside the app repo. Without that last link a public page depends on `raw.githubusercontent.com` being up.

## Scripts are TypeScript, run directly

Node 24 strips types natively — `node scripts/build.ts`, no build step, no emitted JavaScript. Two settings in `tsconfig.json` keep that true and must stay:

- `allowImportingTsExtensions` — imports carry the real `.ts` extension, because that is the file Node opens.
- `erasableSyntaxOnly` — rejects TypeScript that would need *generating* rather than erasing: `enum`, `namespace`, parameter properties. Without it `tsc` accepts code Node then refuses to run.

`schema/project.schema.json` is the authority on what an entry may contain; the types in `scripts/projects.ts` are the compile-time view of the same thing and are deliberately **not** generated from it. A value added to the schema needs adding there too.

`ajv` and `ajv-formats` ship CommonJS. Under `moduleResolution: NodeNext` TypeScript types their default import as the module namespace, while Node hands back `module.exports` — the constructor itself. `validate.ts` casts to correct the type without touching the value; don't "fix" this by reaching for `.default`.

## Branching model

**main only.** Branch off `main`, PR into `main`. There is no `dev` branch and no release branch.

**There is no release-please, and there must not be.** It came in from `TitusKirch/scaffold` and was removed on purpose: this repository is not consumed by version — the app reads the file at HEAD. A release cycle would be exactly the ceremony that having a separate repository exists to avoid. `CHANGELOG.md` went with it.

If you find yourself reaching for a version number here, the answer is that `generatedAt` in `projects.json` is the only stamp this data needs.

## Permission policy

`.claude/settings.json` is deliberately lopsided: a **long `deny` list and a short `allow` list**. The two sides answer different questions, so they follow opposite rules.

**`deny` may be generous.** A rule for a command the repo doesn't have is a no-op, it never needs maintenance, and it is never reviewed — a too-broad block only surfaces when you actually hit it. So the list covers every stack kirchDev repos might grow into, not just this one. `git reflog expire` and `git gc --prune=now` are in there because they destroy the rescue path that survives a `reset --hard`.

The line to draw is **the machine or something remote, not the working copy**. Blocked: anything that wrecks the OS (`dd`, `mkfs`, `chmod -R`, `rm -rf /…`), tears down remote state or resources (`terraform destroy`, `aws ec2 terminate-instances`, `gh repo delete`), or throws away work with no recovery path (force-push, `reset --hard`, `stash drop`). Deliberately *not* blocked, because they are ordinary local development: `rm -rf node_modules`, `docker volume rm`, `docker system prune`, deleting a remote branch. Those prompt instead — a command that is sometimes wanted belongs in the middle state, never in `deny`.

**`allow` must stay short.** Its only return is fewer prompts — no safety is gained. Every line has to be read and understood by whoever copies this file, and an unreviewed allow list is more dangerous than none. Keep what occurs many times per session (read-only git, `ls`/`grep`/`rg`, the project's own check scripts) and let everything else ask.

**Three states, not two.** A command in `allow` runs unasked; one in `deny` is impossible and has to be typed by hand; one in **neither list prompts you** — and that middle state is the right default for almost everything. Reserve `deny` for what a mistaken "yes" could not undo. A normal `git push` is not that: it is reversible, visible and the ordinary way work ships, so it sits in `allow`.

> [!IMPORTANT]
> **Never allow a rule that runs arbitrary code.** `pnpm exec turbo run`, `find . *` (which covers `-delete` and `-exec rm`), a raw `pnpm dlx`, or an MCP tool that executes SQL each hand back everything the `deny` list took away. A deny list is only as strong as the weakest allow rule beside it.

Two things this file cannot do, by design: it cannot tell which branch a `git push` targets (protect main with **branch protection**, not permissions), and prefix rules miss flags placed before the subcommand.

**Codex gets the same policy** in `.codex/rules/default.rules` — permission config is not portable, so the block list exists twice and **both must be changed together**. Codex uses Starlark `prefix_rule()` calls matching on argument *tokens*, which handles flags and shell chains that the `Bash(…)` prefix patterns miss. Check a rule with:

```bash
codex execpolicy check --pretty --rules .codex/rules/default.rules -- git push --force
```

## Conventions

- **Node 24, pnpm 11.** Pinned via `.nvmrc`, `engines`, and `packageManager`. `pnpm-workspace.yaml` enforces `minimumReleaseAge=4320` (3-day cooldown). Don't loosen these without reason.
- **oxc, not eslint/prettier.** `oxlint` + `oxfmt`, configured in `.oxlintrc.json` / `.oxfmtrc.json`. oxfmt also formats JSON, which is what keeps a sync run's diff readable instead of one re-wrapped line.
- **Conventional Commits enforced** via commitlint and the husky `commit-msg` hook. Don't `--no-verify` unless explicitly asked.
- **Husky pre-commit** runs `lint-staged`. Beyond per-file lint/format it runs `pnpm validate` and `pnpm typecheck` as whole-repo commands, because an entry is only ever wrong *in relation to its neighbours*.
- **Workflows** pin `actions/checkout@v7`, `actions/setup-node@v7`, `pnpm/action-setup@v6`, `github/codeql-action/{init,analyze}@v4`. Dependabot bumps them monthly.
- **`.tituskirch-skills.json`** configures the [TitusKirch skills](https://github.com/TitusKirch/skills). `release` and `docs` are set to `false` here — there are no releases, and a data set of this size does not need a `docs/` tree. Regenerate it with the `tituskirch-skills-config` skill.

## House style for READMEs and meta files

`/write-readme` encodes the canonical structure. Key rules: hero block wrapped in `<div align="center">`, prescribed section emojis (✨ Features, 🚀 Setup, 🤝 Contributing, 📄 License), license footer always reads `[MIT](LICENSE) © [Titus Kirch](https://github.com/TitusKirch/) / [IT-Dienstleistungen Titus Kirch](https://kirch.dev)`. Use GitHub callouts (`> [!TIP]`, `> [!IMPORTANT]`), never plain blockquotes.
