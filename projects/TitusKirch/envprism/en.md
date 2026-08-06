# TUI for environment files

Every .env file of a project side by side in one matrix, one view for the whole set of variables instead of one file at a time.

## why

Most projects accumulate a fistful of env files, from .env through .env.example to .env.staging and .env.production, and there is no good way to see them together. You diff two at a time, miss the third, and ship a deploy that is missing exactly one variable. The example file goes stale because nobody updates it when a key is added.

envprism treats the whole set as one thing: every file a column, every variable a row. The gaps jump out, because one key is missing here, one value drifts there, and another is still a placeholder.

## quickstart

```bash
bunx envprism
```

Finds every .env* file in the current directory and opens them as a matrix. No install, no configuration.

## features

- **Matrix view** — differences across any number of files are visible at a glance, instead of only ever pairwise.
- **Per-cell diff** — icons flag values that differ, keys that are missing or extra, and unfilled placeholders like CHANGEME or TODO.
- **Secret masking** — values whose name looks like a token, secret or password render masked, so the view is safe even on a shared screen.
- **Edit in place** — any cell can be changed; editing a key in a file that does not have it yet creates it there. Plus add, delete, and sync one value across every file.
- **Byte-exact write-back** — only the keys you changed are rewritten; comments, blank lines, order, quoting and export prefixes are left untouched.
- **Sections and filtering** — group by comment banner or key prefix, fold sections, filter keys live, or show only the ones that drift.
- **CI-friendly** — a drift report as text or JSON, or just an exit code for pre-commit hooks and pipelines.

## scope

Not a secrets manager and no substitute for a vault: envprism displays and edits local env files, and the masking affects the display alone. It stores and manages no secrets.

## install

```bash
bun add -g envprism
bunx envprism  # without installing
```

Bun 1.3 or newer is required; the package does not run under Node.
