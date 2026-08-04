# Policy-based access control for Laravel

Roles and permissions in one place instead of scattered through the code — with tenant scoping, Laravel Gate integration and a per-request cache.

## why

As soon as an application knows more than one role, permission checks grow into the code: a role lookup here, an organisation comparison there, a special case in a third place. Anyone later asked why a user is allowed to do something has to read half the application.

This package pulls the decision into one place and hooks it into Laravel's own Gate rather than standing up a second permission system beside it. Existing calls keep working unchanged; the answer now comes from roles and permissions, scoped to an organisation where needed.

## quickstart

```php
Pbac::withOrganisation($org->id, fn () => $user->can('members.invite'));
```

Inside the closure that organisation's roles apply; outside it the user stays whatever they otherwise are.

## features

- **Roles and permissions** — plain Eloquent models you can swap out for your own, with UUID, ULID or integer keys.
- **Tenant scoping** — organisation-scoped authorization with a pluggable resolver; scopes never bleed into one another.
- **Native Gate integration** — can, allows and inspect all work as usual, falling back to the Laravel gates you already have.
- **Per-request decision cache** — repeated checks within one request are free, and invalidate automatically when roles or permissions change.
- **Traceable decisions** — an opt-in record of why a check returned what it did, redacted in production by default.
- **Octane-aware** — optional listeners reset state at the end of a request, so nothing carries over between two of them.
- **Configurable throughout** — models, tables, columns and key types are all overridable, and UUID setups work out of the box.

## install

```bash
composer require kirchdev/laravel-pbac
```
