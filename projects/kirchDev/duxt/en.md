# Versioned documentation for Nuxt projects

A Nuxt layer for documentation from multiple repositories and versions. One source list generates collections, URLs, version switching and navigation, without every project rebuilding that structure.

## why

Nuxt Content can already load and cache a repository at a branch or tag. What remains with multiple sources and versions is the same repeated work: collections per repository and version, a URL scheme, redirects and a switcher that offers only pages that actually exist there.

duxt turns that into a source list. It generates collections, prefixes, the sitemap, version switching and the documentation navigation from it.

## quickstart

```ts
export default defineNuxtConfig({
  extends: ['@kirchdev/duxt']
});
```

Markdown files in the docs directory then become a documentation site with search, navigation and a table of contents.

## features

- **Sources instead of collections** — one compact declaration replaces one collection per repository and version.
- **Contextual version switching** — URLs and available versions follow the source; a page never points to a version where it is absent.
- **Git-native sourcing** — branches, tags, private repositories and caching use Nuxt Content's repository support.
- **Human and machine-readable documentation** — search, table of contents, sitemap, llms.txt and an MCP server come from the same collections.
- **A verifiable build** — a validator detects colliding URLs, empty collections, broken links and missing titles before delivery.

## scope

duxt is a layer for Nuxt Content, not a general CMS or documentation service. Content, deployment and the decision of which sources are visible remain with the individual project.

## install

```pnpm
pnpm add -D @kirchdev/duxt
```

The layer is included through extends in the Nuxt configuration. Further sources and versions live under the duxt key in app.config.ts.
