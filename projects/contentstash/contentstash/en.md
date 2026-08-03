# Headless CMS ecosystem built on Laravel

A headless CMS ecosystem built with Laravel, Inertia.js, Vue 3, and Tailwind CSS.

## why

A headless CMS is supposed to manage content and serve it over an API without dictating the presentation. The common options bring their own foundation along — their own language, ORM and extension model — which in a Laravel shop means running and upgrading a second stack.

contentstash builds on what is already there instead: content types are Eloquent models, permissions run through policies, and an extension is a Laravel package. Extending what the CMS can do uses the same tools as the rest of the application.

## features

- **Content types from field types** — string, longer text, integer, boolean, JSON and timestamp; the last of these as a date, a time, or both.
- **Schema changes become migrations** — creating, changing or removing a content type produces the matching migration, instead of reshaping the database at runtime.
- **A REST API per resource** — read, create, update and delete are available for every content type as soon as it is defined.
- **Per-model roles and permissions** — view, create, update and delete are granted individually, across guest, signed-in and administrator levels.
- **Public read access** — content can be exposed to visitors who are not signed in, without building a separate endpoint for it.
- **Extensible through plugins** — custom field types and extensions register through a registry rather than by changing the core.

## scope

The ambition is an ecosystem rather than a single package: core, documentation and example application are developed together, so a change to the core shows up immediately against a real application.
