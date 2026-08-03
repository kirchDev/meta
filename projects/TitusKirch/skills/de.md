# Agent-Skills für Claude Code, Codex, Cursor und OpenCode

Agent-Skills von Titus Kirch — über skills.sh installierbar in Claude Code, Codex, Cursor, OpenCode und verwandten Werkzeugen.

## why

Wer mit einem Coding-Agenten arbeitet, erklärt ihm in jedem Projekt aufs Neue dieselben Dinge: wie ein Commit auszusehen hat, was in einen Pull Request gehört, wie ein Release läuft. Diese Anweisungen leben dann in einer CLAUDE.md je Repository und laufen zwangsläufig auseinander.

Ein Skill zieht dieses Wissen aus dem einzelnen Projekt heraus. Es ist ein Ordner mit einer SKILL.md — Frontmatter plus Anleitung, daneben optional Vorlagen, Referenzen und Skripte. Kein Laufzeitcode: Was der Skill kann, steht als Text darin, und das Werkzeug liest ihn genau dann, wenn die Aufgabe dazu passt.

## quickstart

```bash
npx skills add TitusKirch/skills
```

Danach kennt der Agent die Skills und zieht den passenden von selbst heran, sobald eine Aufgabe darauf fällt.

## features

- **Kein Laufzeitcode** — ein Skill ist Text; was er den Agenten tun lässt, ist vor der Installation lesbar, und ein einzelner lässt sich herausnehmen oder anpassen.
- **Werkzeugübergreifend** — dieselben Dateien bedienen Claude Code, Codex, Cursor und OpenCode; die Installation legt sie an beiden Orten ab, die diese Werkzeuge lesen.
- **Der ganze Arbeitsablauf** — Commit, Pull Request, Issue, Review, Release, Dokumentation und Abhängigkeits-Updates, jeweils als eigener Skill.
- **Pro Repository konfigurierbar** — eine committete Konfigurationsdatei legt Forge, Tracker, Branch-Strategie und Sprache fest, sodass derselbe Skill sich in jedem Projekt richtig verhält.
- **Hausstil erzwungen** — eigene Skills schreiben README, Commits und Pull Requests in der immer gleichen Form, statt sie jedem Projekt neu zu erklären.

## install

```bash
npx skills add TitusKirch/skills        # npm
pnpm dlx skills add TitusKirch/skills   # pnpm
bunx skills add TitusKirch/skills       # bun
```
