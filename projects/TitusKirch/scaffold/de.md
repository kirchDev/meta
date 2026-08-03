# Sprachunabhängige Vorlage für neue Repositories

Sprachunabhängige Basis-Vorlage für neue kirchDev-Repositories.

## why

Jedes neue Repository braucht dieselbe Schicht, bevor die erste Zeile Projektcode entsteht: Linting, Formatierung, Commit-Hooks, CI, Sicherheitsprüfungen, Abhängigkeits-Updates, Issue-Vorlagen und die üblichen Meta-Dokumente. Von Hand zusammengesucht ist das eine halbe Stunde, und beim dritten Repository weicht es bereits ab.

scaffold hält diese Schicht an einer Stelle fest. Der Projektcode selbst darf alles sein — PHP, Go, Rust, Vue oder Shell —, denn die Vorlage enthält keinen. Sie beantwortet nur die Frage, was ein Repository am ersten Tag mitbringen soll.

## quickstart

```bash
gh repo create my-new-repo --template TitusKirch/scaffold
```

Oder über „Use this template" auf GitHub; danach bleiben nur ein paar Platzhalter zu ersetzen.

## features

- **Node und pnpm festgenagelt** — die Version steht in .nvmrc, engines und packageManager, damit alle Beteiligten und die CI dieselbe benutzen.
- **Linting und Formatierung über oxc** — oxlint und oxfmt hinter einem einzigen Prüfbefehl, der auch in der CI läuft.
- **Commit-Hooks** — husky, lint-staged und commitlint erzwingen Conventional Commits, bevor etwas ins Repository gelangt.
- **Abhängigkeits-Updates** — Dependabot fasst Minor- und Patch-Updates je Ökosystem zu einem Pull Request zusammen; große Sprünge kommen einzeln.
- **Workflows** — Lint und Formatprüfung im Pull Request, CodeQL bei Push, im Pull Request und wöchentlich.
- **Release-Automatik** — release-please erzeugt Version und Changelog aus den Commits, sodass ein neues Repository vom ersten Commit an veröffentlichen kann.
- **Vorlagen und Meta-Dokumente** — Issue-Formulare, Pull-Request-Checkliste, Lizenz, Verhaltenskodex, Beitrags- und Sicherheitsleitfaden.
- **Für Agenten vorbereitet** — CLAUDE.md und AGENTS.md werden byte-identisch gehalten, dazu kommt eine durchdachte Basis-Rechtevergabe.

## scope

Die Vorlage besitzt nur die Meta-Schicht. Anwendungscode, Framework-Entscheidungen und Projektstruktur bleiben bewusst außen vor — sonst wäre sie eine Vorlage für genau eine Art von Projekt statt für alle.
