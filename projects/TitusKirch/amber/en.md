# Backup tool for Git and GitHub

Back up Git repositories and their full forge metadata — issues, PRs, releases, labels — not just the git history.

## why

A git clone saves the code. What vanishes when an account is suspended, an organisation deleted or a repository removed by accident is everything else: the discussion in the issues, the reviews on the pull requests, the releases and their notes, the labels and milestones the work hung on.

That is the part amber captures too. The repository is cloned as a full mirror, the metadata is written as JSON beside it, and a manifest records what was backed up and when. Storage stays deliberately readable as files and folders instead of disappearing into an archive format of its own.

## quickstart

```bash
amber backup --token $GITHUB_TOKEN --out ./backups
```

Creates one directory per repository holding the git mirror and the metadata, plus a manifest at the root.

## features

- **Full git mirror** — cloned as a mirror, so every branch, tag and ref comes along, not just the default branch.
- **Metadata, not just code** — issues, pull requests with their comments, labels, milestones and releases are exported as JSON; exactly what is otherwise gone when an account is lost.
- **Incremental re-runs** — later runs use timestamps to fetch only what changed since the last one.
- **Verifiable manifest** — an index at the root records what was backed up and when, with integrity hashes per artifact.
- **Readable as files** — the mirror and the JSON exports sit on disk as ordinary folders rather than in an archive format of their own; restoring means copying.

## install

```bash
git clone https://github.com/TitusKirch/amber.git
cd amber
pnpm install
```
