# A CLI that maintains a .gitignore rather than generating one

Keeps curated blocks inside a region the tool owns and re-renders them on demand. Everything outside that region is left alone.

## why

The common tools fetch and dump: you pull a template once, paste it in, and drift from there. None of them reconciles later, so a .gitignore grows into a few hundred lines of ballast nobody dares touch.

gitignore-sync keeps a managed region inside the file instead and re-renders it as often as you like. The rest is a free zone the tool never writes to. That is what makes the second run safe and the hundredth boring.

## quickstart

```bash
gitignore-sync init   # detect, confirm, write the region
gitignore-sync sync   # re-render, as often as you like
gitignore-sync check  # in CI: non-zero on drift
```

Detection happens on the first command only. A package.json that shows up later never rewrites the file by itself.

## features

- **Reconciles instead of re-dumping** — the sync is idempotent, so it belongs in a habit, a hook or a cron rather than a one-off ritual.
- **Your own lines are never lost** — a hand-written line found inside a managed block moves to the free zone instead of being deleted. That rule is what makes the second run safe.
- **Deduplication that knows git** — exact duplicates go, but .idea and .idea/ and /.idea are three different patterns to git and are therefore reported, never quietly merged.
- **Catches the mistake that disables exceptions** — a stray entry beside an exception rule silently switches it off, because git never looks inside an ignored directory. That gets a warning of its own.
- **Folds in the editor** — the region is marked as a folding range, so a forty-line block collapses to a single line.
- **A real gate for CI** — the check reports drift and duplicates and exits non-zero, so a stale block fails the build instead of rotting.

## scope

There is no release and no published package yet, and the version still reads 0.0.0. The commands above run from a clone today, not from an installation.

Beyond the file the tool does not reach anyway: what gets ignored is still git's decision alone, and a file already under version control is not brought back by any entry.
