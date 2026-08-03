<div align="center">

# 🗂️ meta

**The source of the projects listed on [kirch.dev/projekte](https://kirch.dev/projekte) — curated by hand, kept current by CI**

</div>

---

```bash
curl -s https://raw.githubusercontent.com/kirchDev/meta/main/projects.json | jq '.projects[].slug'
```

One file, no token, no rate limit. The site fetches exactly that and nothing else.

## ✨ What this is

Data and a build, not an application. Everything about a project falls into one of three parts, and keeping them apart is the whole design:

| What                                                        | Lives in       | Changes by                             |
| :---------------------------------------------------------- | :------------- | :------------------------------------- |
| **Facts** — licence, stars, last push, archived             | GitHub API     | The sync workflow, daily + on dispatch |
| **Editorial** — category, technologies, prose, code samples | Here, by hand  | A commit                               |
| **Presentation** — labels, icons, colours, layout           | `kirchDev/app` | A deploy                               |

Categories and technologies travel as **keys** (`cli`, `typescript`), never as labels. What `cli` is called in German and which icon it gets belongs to the app — otherwise it would be maintained in two places.

> [!TIP]
> The point of a separate repository isn't tidiness. It's that the **GitHub token moves out of the web app and into an Actions secret** — a publicly reachable site then needs none at all.

## 🚀 Adding a project

One directory per project. Creating it *is* the act of inclusion — there is no topic scanning and no discovery, so the default is "does not appear" rather than "appears by accident".

```bash
mkdir -p projects/TitusKirch/my-tool
```

**`project.json`** — only what the page filters on:

```json
{
  "$schema": "../../../schema/project.schema.json",
  "kind": "oss",
  "category": "cli",
  "technologies": ["typescript", "nodejs"],
  "links": [{ "type": "npm", "url": "https://www.npmjs.com/package/my-tool" }]
}
```

**`de.md` and `en.md`** — everything a reader actually sees, written as a shortened README for the project and laid out the same way for every project. Both are mandatory; a missing file is an error, not a fallback to the other language.

````markdown
# Eine Zeile, die das Projekt erklärt

Ein Absatz Zusammenfassung — das Einzige, was auf der Karte steht.

## why

Warum es das Ding gibt, das Problem dahinter.

## quickstart

```bash
$ my-tool --help
```

Eine Zeile dazu, was man da sieht.

## features

- **Erste Funktion** — eine Zeile Erklärung.
- **Zweite Funktion** — noch eine.

## scope

Was es bewusst nicht tut.

## install

```bash
npm install -g my-tool
```
````

A `##` heading is a **key, not a title** — "Quickstart" and "Schnellstart" are the same section, and what it is called lives in the app beside the category names. The canonical order is `why` → `quickstart` → `features` → `scope` → `install`; every section is optional, but a file has to keep them in that order.

Inside a section anything goes: paragraphs, `- **Term** — text` lists, fenced code. A fence carries only its language — no role, because the section already says whether it is an installation command or a sample.

The prose is **plain text**: the app renders it without a Markdown renderer, so emphasis or backticks would reach the page literally. Only three things are parsed as structure — the `##` keys, the fences, and the `**Term** —` of a list item.

Then:

```bash
pnpm validate
```

<details>
<summary><b>Why the code samples sit in the language files</b></summary>

Because a sample isn't language-neutral — `bunx envprism  # ohne Installation` carries a German comment, and its English counterpart reads `# without installing`. Holding samples in the shared `project.json` made that inexpressible.

The cost is that each language repeats the sample. `pnpm validate` closes that gap: the _content_ of a block may differ between languages, but the **structure may not** — same sections in the same order, same blocks inside them, same number of list items.

Owner and slug come from the directory path rather than from `project.json`, for the same reason: a field restating what the path already says is a field that can disagree with it. The GitHub link is derived too, and listing it is rejected.

</details>

> [!IMPORTANT]
> `kind`, `category`, `maturity`, `activity`, `technologies` and `links[].type` are **closed vocabularies** enforced by `schema/project.schema.json`. Extending one is a deliberate edit to that file — a free string list turns one typo into a second filter chip on the page (`TypeScript` and `Typescript` side by side), with no error and nothing to notice.
>
> A new category or technology also needs its label and icon in `kirchDev/app` before it renders.

## Lifecycle

Two fields, because the values answer two different questions:

| Field      | Question            | Values               | Omitted means       |
| :--------- | :------------------ | :------------------- | :------------------ |
| `maturity` | How finished is it? | `wip`                | stable              |
| `activity` | Is work happening?  | `paused`, `legacy`   | actively maintained |

They are independent, so they combine: `wip` + `paused` is an early prototype currently resting. `paused` and `legacy` cannot combine — they sit on the same axis and contradict each other, and only one value fits in the field.

<details>
<summary><b>Why two fields instead of one list of tags</b></summary>

A set like `["wip", "paused"]` would also admit `["paused", "legacy"]` — one claims the work resumes, the other that it does not. Two fields make that unsayable rather than merely discouraged.

**`legacy` is GitHub's `archived`**, which the sync reads, so writing it by hand as well would be a second truth free to disagree with the first. Archiving the repository is the one action that makes it true everywhere at once. The schema therefore accepts `activity: "legacy"` only on a `github: false` entry — a private project has no repository to archive and has to say so itself. The build also rejects `paused` on a repository GitHub reports as archived.

**`paused` ages against you.** It is a claim about the future; left standing for years it reads as abandoned-but-unadmitted, while `updatedAt` already says how long a project has been quiet — verifiably, and without upkeep.

</details>

## 🔒 Private projects

**Private repositories are never read.** A private project gets an entry with `"github": false`, which means the sync never calls the API for it, it gets no repository link, and it must state its own `license` — there is no repository to read one from. The page can't tell that a repository exists behind it at all; it sees an entry without a GitHub button.

This is why no secret with access to private repositories exists anywhere in this repo. The built-in `GITHUB_TOKEN` reads public metadata, which is all the sync ever needs.

## 🔁 How `projects.json` is built

`.github/workflows/sync-projects.yml` runs daily, on `workflow_dispatch`, and on any push that touches an entry. It validates, fetches the facts, and opens a pull request against `main` — never a direct push, so a change in the numbers is reviewed like any other.

Two properties worth knowing:

- **All-or-nothing.** If a single API call fails, nothing is written. A partial file is worse than a stale one: the site's fallback chain can serve the last good copy, but it can't tell that a project vanished because one call errored.
- **Commits go through the Contents API**, not `git push`. Commits made that way with `GITHUB_TOKEN` are signed by GitHub and count as _Verified_, which the `required_signatures` rule on `main` insists on.

```bash
pnpm build   # the same thing locally — needs network
```

## 🛠️ Development

| Command          | What it does                                              |
| :--------------- | :-------------------------------------------------------- |
| `pnpm install`   | Install deps and wire the husky hooks                     |
| `pnpm check`     | `lint` + `format` + `typecheck` + `validate` — the CI gate |
| `pnpm validate`  | Schema **and** cross-file checks over every entry. Offline |
| `pnpm build`     | Fetch facts and write `projects.json`. Needs network       |
| `pnpm check:fix` | Auto-fix lint + format                                    |

The scripts are TypeScript run directly by Node 24, which strips types natively — no build step and no emitted JavaScript.

There are no releases here and no `CHANGELOG.md`. This repository isn't consumed by version — the app reads the file at HEAD, and `generatedAt` is the only stamp the data needs.

## 🤝 Contributing

Branch off `main`, PR into `main`. Conventional Commits are enforced by commitlint, and `pnpm check` has to pass. See [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

[MIT](LICENSE) © [Titus Kirch](https://github.com/TitusKirch/) / [IT-Dienstleistungen Titus Kirch](https://kirch.dev)
