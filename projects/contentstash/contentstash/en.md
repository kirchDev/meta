# Headless CMS built on Laravel

Manages content with the tools a Laravel application already has, namely Eloquent, policies and migrations, and serves it over a REST API.

## why

A headless CMS is supposed to manage content and serve it over an API without dictating the presentation. The common options bring along their own foundation, from the ORM to the extension model. In a Laravel shop that means a second stack to run and upgrade, often in a different language.

contentstash builds on what is already there instead. A content type is an ordinary Eloquent model, and the rest follows: guarding access means writing a policy, changing the schema means writing a migration. Extending what the CMS can do uses the same tools as the rest of the application.

## features

- **Content types from field types** — string, text, integer, bigInteger, boolean, json and timestamp, the same column types a migration would use.
- **Schema changes become migrations** — creating, changing or removing a content type produces a real migration file rather than an ad-hoc schema change.
- **A REST API per resource** — read, create, update and delete are available for every content type as soon as it is defined.
- **Per-model roles and permissions** — list, view, create, update and delete are granted individually, through system roles from guest to administrator.
- **Public read access** — content can be exposed to visitors who are not signed in, without building a separate endpoint for it.
- **Custom field types through a registry** — additional attribute types are registered rather than written into the core; the built-in ones use the same path.

## scope

contentstash does not render content: it serves it over the REST API, and how it is presented is the consuming application's decision.
