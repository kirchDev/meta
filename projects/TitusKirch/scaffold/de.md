# Sprachunabhängige Vorlage für neue Repositories

Alles, was ein Repository am ersten Tag braucht, von Linting und Commit-Hooks über CI und Sicherheits-Scans bis zu den üblichen Meta-Dokumenten, ohne eine Zeile Projektcode vorzugeben.

## why

Bevor in einem neuen Repository die eigentliche Arbeit beginnt, steht jedes Mal dieselbe Meta-Schicht an, und von Hand zusammengesucht weicht sie zwischen zwei Repositories unweigerlich voneinander ab. Dann prüft jedes Repository etwas anderes, und eine Korrektur an der Schicht erreicht nur das eine, in dem sie gemacht wurde.

scaffold bündelt diese Schicht in einem Template-Repository. Der Projektcode selbst darf alles sein, ob PHP, Go, Rust, Vue oder Shell, denn die Vorlage enthält keinen. Sie beantwortet nur die Frage, was ein Repository am ersten Tag mitbringen soll.

## quickstart

```bash
gh repo create my-new-repo --template TitusKirch/scaffold
```

Oder über „Use this template“ auf GitHub; welche Platzhalter danach zu ersetzen sind, listet das README.

## features

- **Node und pnpm fixiert** — Node über .nvmrc und engines, pnpm über packageManager, damit alle Beteiligten und die CI dieselbe Version benutzen.
- **Linting und Formatierung über oxc** — oxlint und oxfmt hinter einem gemeinsamen Prüfbefehl; die CI fährt dieselben Prüfungen.
- **Commit-Hooks** — husky, lint-staged und commitlint erzwingen Conventional Commits, bevor etwas ins Repository gelangt.
- **Abhängigkeits-Updates** — Dependabot fasst Minor- und Patch-Updates je Ökosystem zu einem Pull Request zusammen; große Sprünge kommen einzeln.
- **CodeQL** — Sicherheitsanalyse bei Push, im Pull Request und wöchentlich.
- **Release-Automatik** — release-please erzeugt Version und Changelog aus der Commit-Historie statt von Hand.
- **Vorlagen und Meta-Dokumente** — Issue-Formulare, Pull-Request-Checkliste, Lizenz, Verhaltenskodex, Beitrags- und Sicherheitsleitfaden.
- **Für Agenten vorbereitet** — CLAUDE.md und AGENTS.md werden byte-identisch gehalten, dazu eine Basis-Rechtevergabe für Claude Code und Codex, deren Gleichlauf die CI prüft.

## scope

Die Vorlage besitzt nur die Meta-Schicht. Anwendungscode, Framework-Entscheidungen und Projektstruktur bleiben außen vor. Sonst wäre sie eine Vorlage für genau eine Art von Projekt statt für alle.
