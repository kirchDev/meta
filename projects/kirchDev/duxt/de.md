# Versionsübergreifende Dokumentation für Nuxt-Projekte

Eine Nuxt-Schicht für Dokumentation aus mehreren Repositories und Versionen. Eine Quellenliste erzeugt Collections, URLs, Versionswechsel und Navigation, ohne dass jedes Projekt diese Struktur selbst aufbauen muss.

## why

Nuxt Content kann ein Repository schon an einem Branch oder Tag laden und cachen. Was bei mehreren Quellen und Versionen bleibt, ist dieselbe wiederholte Arbeit: Collections je Repository und Version, ein URL-Schema, Redirects und ein Wechsel, der nur Seiten anbietet, die dort wirklich existieren.

duxt macht daraus eine Quellenliste. Aus ihr entstehen Collections, Präfixe, Sitemap, Versionswechsel und die Navigation der Dokumentation.

## quickstart

```ts
export default defineNuxtConfig({
  extends: ['@kirchdev/duxt']
});
```

Danach werden Markdown-Dateien aus dem Verzeichnis docs zu einer Dokumentationsseite mit Suche, Navigation und Inhaltsverzeichnis.

## features

- **Quellen statt Collections** — eine kompakte Deklaration ersetzt eine Collection pro Repository und Version.
- **Versionswechsel mit Kontext** — URLs und verfügbare Versionen folgen der Quelle; eine Seite verweist nicht auf eine Version, in der sie fehlt.
- **Git als Quelle** — Branches, Tags, private Repositories und Cache-Verhalten nutzen die Repository-Unterstützung von Nuxt Content.
- **Lesbare und maschinenlesbare Dokumentation** — Suche, Inhaltsverzeichnis, Sitemap, llms.txt und ein MCP-Server entstehen aus denselben Collections.
- **Prüfbarer Build** — ein Validator erkennt kollidierende URLs, leere Collections, defekte Links und fehlende Titel vor der Auslieferung.

## scope

duxt ist eine Schicht für Nuxt Content, kein allgemeines CMS und kein Dokumentationsdienst. Inhalte, Deployment und die Entscheidung, welche Quellen sichtbar sind, bleiben im jeweiligen Projekt.

## install

```pnpm
pnpm add -D @kirchdev/duxt
```

Die Schicht wird über extends in der Nuxt-Konfiguration eingebunden. Weitere Quellen und Versionen stehen unter dem Schlüssel duxt in app.config.ts.
