# Agent-Skills für Claude Code, Codex, Cursor und OpenCode

Wiederkehrende Arbeitsabläufe wie Commit, Pull Request, Issue, Review und Release einmal als Skill beschrieben statt in jeder CLAUDE.md neu; installierbar über skills.sh.

## why

Wer mit einem Coding-Agenten arbeitet, erklärt ihm in jedem Projekt aufs Neue dieselben Dinge: wie ein Commit auszusehen hat, was in einen Pull Request gehört, wie ein Release läuft. Diese Anweisungen leben dann in einer CLAUDE.md je Repository und laufen zwangsläufig auseinander.

Ein Skill zieht dieses Wissen aus dem einzelnen Projekt heraus. Er ist ein Ordner mit einer SKILL.md aus Frontmatter und Anleitung, daneben Vorlagen, Referenzen und kleine Hilfsskripte. Was ein Skill den Agenten tun lässt, steht als Text darin, und das Werkzeug liest ihn genau dann, wenn die Aufgabe dazu passt.

## quickstart

```bash
npx skills add TitusKirch/skills
```

Ein Befehl, und jeder Skill des Bundles ist im Agenten auffindbar. Kein Manifest zu pflegen, keine Symlinks zu setzen. Den passenden zieht der Agent anhand der Beschreibung in der jeweiligen SKILL.md heran, sobald eine Aufgabe danach verlangt.

## features

- **Vor der Installation lesbar** — ein Skill besteht aus Text und höchstens einem kleinen Shell-Helfer, der die Repo-Konfiguration ausliest; was er den Agenten tun lässt, steht offen da, und ein einzelner lässt sich herausnehmen oder anpassen.
- **Werkzeugübergreifend** — dieselben Dateien bedienen Claude Code, Codex, Cursor und OpenCode; die Installation legt sie dort ab, wo das jeweilige Werkzeug sie liest.
- **Der ganze Arbeitsablauf** — Commit, Pull Request, Issue, Review, Release, Dokumentation und Abhängigkeits-Updates, jeweils als eigener Skill.
- **Arbeitsschleife für Agenten** — Issues implementieren, pushen und von einem zweiten, unabhängigen Agenten prüfen lassen, einzeln oder als ganze Warteschlange.
- **Pro Repository konfigurierbar** — eine committete Konfigurationsdatei legt Forge, Tracker, Branch-Strategie und Sprache fest, sodass derselbe Skill sich in jedem Projekt richtig verhält.
- **Hausstil erzwungen** — eigene Skills schreiben README, Commits und Pull Requests in der immer gleichen Form, statt sie jedem Projekt neu zu erklären.

## scope

Kein generisches Skill-Framework: Die Sammlung kodiert die Konventionen ihres Autors. Der Hausstil, den die Docs-Skills schreiben, also README-Aufbau, Sektions-Emojis und Badge-Palette, ist gesetzt, damit jedes Repository gleich aussieht. Wer anders arbeitet, passt den einzelnen Skill an; eine Einstellung dafür gibt es nicht.

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
