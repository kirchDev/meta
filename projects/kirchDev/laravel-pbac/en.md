# Policy-based access control for Laravel

Roles and permissions in one place instead of scattered through the code, with tenant scoping, Laravel Gate integration and a per-request cache.

## why

As soon as an application knows more than one role, permission checks creep into the code: a role lookup here, an organisation comparison there, and the odd special case on top. Anyone later asked why a user is allowed to do something has to read half the application.

This package consolidates the decision and hooks it into Laravel's own Gate rather than standing up a second permission system beside it. Existing calls keep working unchanged; the answer now comes from roles and permissions, scoped to an organisation where needed.

## quickstart

```php
Pbac::withOrganisation($org->id, fn () => $user->can('members.invite'));
```

With organisation scoping enabled in the config, that organisation's roles apply inside the closure on top of the global ones; outside it the user stays whatever they otherwise are.

## features

- **Tenant scoping** — organisation-scoped authorization with a pluggable resolver; scopes never bleed into one another.
- **Native Gate integration** — can, allows and inspect all work as usual, falling back to the Laravel gates you already have.
- **Per-request decision cache** — repeated checks within one request are free, and invalidate automatically when roles or permissions change.
- **Traceable decisions** — every check carries its decision trail, and logging it is opt-in; in production it is redacted by default.
- **Octane-aware** — optional listeners reset state at the end of a request, so nothing carries over between requests.
- **Swappable throughout** — roles and permissions are plain Eloquent models; models, tables, columns and key types are all overridable, keys as UUID, ULID or integer.

## scope

Permissions travel through roles only: there is no direct grant to individual users, no wildcard abilities, and no guard concept of its own. Abilities carry explicit names and resolve through the Gate. The package also ships no middleware and no Blade directives, since Laravel's can middleware and @can already go through the Gate.

If you are coming from spatie/laravel-permission, a dedicated migration guide works through these differences, complete with an Artisan command that moves the data across.

## install

```bash
composer require kirchdev/laravel-pbac
php artisan vendor:publish --tag=pbac-config
php artisan vendor:publish --tag=pbac-migrations
php artisan migrate
```

The config step is optional, but it belongs before the migration whenever models, tables or key types are meant to differ: the key types are baked into the schema.
