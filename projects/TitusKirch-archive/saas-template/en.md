# SaaS application template built on Laravel and Nuxt

A repository template that brings Laravel as the backend and Nuxt as the frontend together in one monorepo, with the paths to ship it already wired up.

## why

A SaaS application rarely starts with the domain. First there are two applications to set up, shared types to pass between them, Docker images to build and two different targets to deliver to: the frontend goes to a CDN, the backend to a server. That work comes up again with every new project.

The template does that work up front. Backend, frontend, shared packages and delivery are wired up, so a new project starts at the domain.

## features

- **Laravel and Nuxt in one repository** — services and apps live side by side instead of in two repositories that have to be kept in step.
- **Shared packages** — ESLint, TypeScript and base configuration live once under packages and are shared by the apps.
- **Delivery prepared** — workflows build Docker images for the GitHub Container Registry; the apps go to Cloudflare Pages, the API service to Laravel Forge, split into development, staging and production.
- **Monorepo tooling in place** — pnpm workspaces and Turborepo are configured, including the dependencies between the parts.

## scope

The template stays online as a reference, for the shape of a Laravel-and-Nuxt monorepo and the delivery paths that go with it.
