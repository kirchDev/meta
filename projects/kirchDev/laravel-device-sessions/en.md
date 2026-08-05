# Device-bound login sessions for Laravel

One remember-me token per device instead of a single one per user, with a device list, targeted revoke and rename, privacy-respecting and Fortify-agnostic.

## why

Laravel remembers exactly one remember-me token per user, in a single column. Two annoyances follow: signing out on your phone signs you out on your desktop too, and nobody can see which devices are signed in at all. After a lost laptop all you can do is change the password and hope.

This package binds a token per device to a device row and a cookie. That is what lets you show the list of signed-in devices at all and revoke a single one, and the usual details, meaning OS, name and IP, are handled with restraint.

## quickstart

```php
use KirchDev\DeviceSessions\Concerns\HasDeviceSessions;

class User extends Authenticatable
{
    use HasDeviceSessions;
}
```

Plus the device-aware provider driver in the auth config and the bundled middleware on your authenticated routes. That is what the device list runs on.

## features

- **Device-bound remember-me** — a custom driver ties each token to a device row and a cookie instead of one shared column; one active token per device, rotated on login.
- **Where am I signed in** — list active devices with OS, a friendly name, a masked IP and last-seen; revoke one, revoke all others, or rename.
- **Privacy-respecting** — IP addresses are stored truncated by default, and the masking is swappable through a contract.
- **Fortify-agnostic** — works under any login mechanism; the two-factor cookie bridge wires itself up only when Fortify is actually present.
- **Overridable everywhere** — name parsing, OS detection, cookie policy, IP masking and token hashing are contracts with defaults you can live with.
- **Fits the schema you have** — key types id, uuid or ulid, so the foreign key lines up with the users table you already own; table names and models are swappable, and the migrations read all of it at run time.
- **Event-driven** — an event whenever a device's last-seen is written (throttled to once a minute by default) lets you react without the package assuming anything about the rest of your schema.

## scope

Revoking cuts the remember-me layer, not the live session: the device cannot get back in through its cookie, but a PHP session still open there keeps running until it expires or the user signs out; the package never writes to the session store. Nor does it ship a UI: no routes, no views; listing, revoking and renaming are actions you call from your own controllers.

## install

```bash
composer require kirchdev/laravel-device-sessions
php artisan vendor:publish --tag=device-sessions-migrations
php artisan migrate
```
