# Agent skills for Claude Code, Codex, Cursor and OpenCode

Agent skills by Titus Kirch — installable via skills.sh in Claude Code, Codex, Cursor, OpenCode and friends.

## why

Working with a coding agent means explaining the same things in every project: what a commit should look like, what belongs in a pull request, how a release runs. Those instructions end up in a CLAUDE.md per repository, and inevitably drift apart.

A skill lifts that knowledge out of the individual project. It is a folder holding a SKILL.md — frontmatter plus instructions, with optional templates, references and scripts beside it. No runtime code: what the skill can do is written in it as text, and the tool reads it exactly when the task calls for it.

## quickstart

```bash
npx skills add TitusKirch/skills
```

From then on the agent knows the skills and reaches for the right one by itself when a task calls for it.

## features

- **No runtime code** — a skill is text; what it makes the agent do is readable before you install it, and a single one can be lifted out or adapted.
- **Tool-agnostic** — the same files serve Claude Code, Codex, Cursor and OpenCode; installing puts them in both of the locations those tools read.
- **The whole workflow** — commit, pull request, issue, review, release, documentation and dependency updates, each as its own skill.
- **Configurable per repository** — a committed config file sets forge, tracker, branch strategy and language, so the same skill behaves correctly in every project.
- **House style enforced** — dedicated skills write READMEs, commits and pull requests in one consistent shape, instead of re-explaining it per project.

## install

```bash
npx skills add TitusKirch/skills        # npm
pnpm dlx skills add TitusKirch/skills   # pnpm
bunx skills add TitusKirch/skills       # bun
```
