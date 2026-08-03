# Device-bound login sessions for Laravel

Device-bound login sessions for Laravel: per-device remember-me tokens, a "where am I signed in" device list, and revoke/rename — privacy-respecting and Fortify-agnostic.

## why

Laravel remembers exactly one remember-me token per user, in a single column. Two annoyances follow: signing out on your phone signs you out on your desktop too — and nobody can see which devices are signed in at all. After a lost laptop all you can do is change the password and hope.

This package binds a token per device to a device row and a cookie. That makes the list of signed-in devices presentable, lets individual ones be revoked, and treats the usual details — OS, name, IP — with restraint.

## quickstart

```php
use KirchDev\DeviceSessions\Concerns\HasDeviceSessions;

class User extends Authenticatable
{
    use HasDeviceSessions;
}
```

Plus the device-aware driver in the auth config — that is all it takes for the device list to work.

## features

- **Device-bound remember-me** — a custom driver ties each token to a device row and a cookie instead of one shared column; one active token per device, rotated on login.
- **Where am I signed in** — list active devices with OS, a friendly name, a masked IP and last-seen; revoke one, revoke all others, or rename.
- **Privacy-respecting** — IP addresses are stored truncated by default, and the masking is swappable through a contract.
- **Fortify-agnostic** — works under any login mechanism; the two-factor cookie bridge wires itself up only when Fortify is actually present.
- **Overridable everywhere** — name parsing, OS detection, cookie policy, IP masking and token hashing are contracts with sensible defaults.
- **Configurable schema** — models, table names and key types can be set before migrating.
- **Event-driven** — an event on every device touch lets you react without the package assuming anything about the rest of your schema.

## install

```bash
composer require kirchdev/laravel-device-sessions
php artisan vendor:publish --tag=device-sessions-migrations
php artisan migrate
```
