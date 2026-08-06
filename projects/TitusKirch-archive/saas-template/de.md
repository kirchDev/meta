# Vorlage für SaaS-Anwendungen mit Laravel und Nuxt

Eine Repository-Vorlage, die Laravel als Backend und Nuxt als Frontend in einem Monorepo zusammenbringt, samt fertigen Wegen zum Ausliefern.

## why

Eine SaaS-Anwendung beginnt selten bei der Fachlichkeit. Zuerst sind zwei Anwendungen aufzusetzen, Typen zwischen beiden zu teilen, Docker-Images zu bauen und zwei verschiedene Ziele zu beliefern: Das Frontend geht auf ein CDN, das Backend auf einen Server. Diese Arbeit fällt bei jedem neuen Projekt wieder an.

Die Vorlage nimmt sie vorweg. Backend, Frontend, geteilte Pakete und die Auslieferung sind verdrahtet, sodass ein neues Projekt bei der Fachlichkeit anfängt.

## features

- **Laravel und Nuxt in einem Repository** — Services und Apps liegen nebeneinander statt in zwei Repositories, die man synchron halten muss; pnpm-Workspaces und Turborepo verdrahten die Abhängigkeiten zwischen den Teilen, sodass Builds in der richtigen Reihenfolge und gecacht laufen.
- **Geteilte Pakete** — ESLint-, TypeScript- und Basis-Konfiguration liegen einmal unter packages und werden von den Apps gemeinsam genutzt.
- **Auslieferung vorbereitet** — Workflows bauen Docker-Images für die GitHub Container Registry; die Apps gehen nach Cloudflare Pages, der API-Service zu Laravel Forge, getrennt nach Entwicklung, Stage und Produktion.

## scope

Die Vorlage bleibt als Referenz online, für den Zuschnitt eines Laravel-und-Nuxt-Monorepos und die Auslieferungswege dazu; Abhängigkeiten und Workflows stehen auf dem Stand, zu dem die Weiterentwicklung endete, und werden seither nicht mehr aktualisiert.
