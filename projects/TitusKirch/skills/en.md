# Agent skills for Claude Code, Codex, Cursor and OpenCode

Recurring workflows like commit, pull request, issue, review and release described once as skills instead of in every CLAUDE.md; installable via skills.sh.

## why

Working with a coding agent means explaining the same things in every project: what a commit should look like, what belongs in a pull request, how a release runs. Those instructions end up in a CLAUDE.md per repository, and inevitably drift apart.

A skill lifts that knowledge out of the individual project. It is a folder holding a SKILL.md of frontmatter plus instructions, with templates, references and small helper scripts beside it. What it makes the agent do is written down as text, and the tool reads it exactly when the task calls for it.

## quickstart

```bash
npx skills add TitusKirch/skills
```

One command, and every skill in the bundle is discoverable inside the agent. No manifest to edit, no symlinks to manage. The agent routes to the right one by each skill's description in its SKILL.md the moment a task warrants it.

## features

- **Readable before you install** — a skill is text plus at most a small shell helper that reads the repo config; what it makes the agent do is out in the open, and a single one can be lifted out or adapted.
- **Tool-agnostic** — the same files serve Claude Code, Codex, Cursor and OpenCode; installing puts them where each tool looks for them.
- **The whole workflow** — commit, pull request, issue, review, release, documentation and dependency updates, each as its own skill.
- **A work loop for agents** — implement an issue, push it, and have a second, independent agent review it, one at a time or as a whole queue.
- **Configurable per repository** — a committed config file sets forge, tracker, branch strategy and language, so the same skill behaves correctly in every project.
- **House style enforced** — dedicated skills write READMEs, commits and pull requests in one consistent shape, instead of re-explaining it per project.

## scope

This is not a generic skill framework: the collection encodes its author's conventions. The house style the docs skills write, meaning README layout, section emojis and badge palette, is prescribed so every repository comes out the same. Working differently means adapting the individual skill; there is no setting for it.

## install

```pnpm
pnpm dlx skills add TitusKirch/skills
```

```npm
npx skills add TitusKirch/skills
```

```yarn
yarn dlx skills add TitusKirch/skills
```

```bun
bunx skills add TitusKirch/skills
```
