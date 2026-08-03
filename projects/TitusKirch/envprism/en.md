# TUI for environment files

TUI-based env file manager — refract one set of variables into many environment views.

## why

Most projects accumulate a fistful of env files — .env, .env.example, .env.staging, .env.production — with no good way to see them together. You diff two at a time, miss the third, and ship a deploy where one variable was set everywhere except staging. The example file rots because nobody updates it when a key is added.

envprism treats the whole set as one thing: every file a column, every variable a row. The gaps jump out — this key is missing here, that value drifts there, this one is still a placeholder. Edits write back byte-exact, and secret values stay masked so the view is safe to share.

## quickstart

```bash
bunx envprism
```

Finds every .env* file in the current directory and opens them as a matrix — no install, no configuration.

## features

- **Matrix view** — differences across any number of files are visible at a glance, instead of only ever pairwise.
- **Per-cell diff** — icons flag values that differ, keys that are missing or extra, and unfilled placeholders like CHANGEME or TODO.
- **Secret masking** — values whose name looks like a token, secret or password render masked, so the view is safe even on a shared screen.
- **Edit in place** — any cell can be changed; editing a key in a file that does not have it yet creates it there. Plus add, delete, and sync one value across every file.
- **Byte-exact write-back** — only the keys you changed are rewritten; comments, blank lines, order, quoting and export prefixes are left untouched.
- **Sections and filtering** — group by comment banner or key prefix, fold sections, filter keys live, or show only the ones that drift.
- **Undo** — the last edits, additions and deletions can be walked back before anything is written.
- **CI-friendly** — a drift report as text or JSON, or just an exit code for pre-commit hooks and pipelines.

## install

```bash
bun add -g envprism
bunx envprism  # without installing
```
