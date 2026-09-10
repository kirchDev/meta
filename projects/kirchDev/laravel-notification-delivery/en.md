# Delivery rules and an inbox for Laravel notifications

Adds a persistent inbox, read state and recipient-specific delivery preferences to Laravel notifications. A chain of rules decides which channels deliver a notification before via() runs.

## why

Once an application needs a notification bell, it builds storage, read state and preferences itself. The results vary, although Laravel notifications, channels and Notification::send() are already the right frame.

This package adds only the missing delivery layer. Notifications keep their Laravel types and channels, while the decision over inbox, live notice, mail and deferred delivery follows a traceable rule chain.

## quickstart

```php
class User extends Authenticatable
{
    use HasNotificationDelivery;
    use RoutesNotifications;
}
```

The trait replaces Laravel's database notifications on the recipient. Migrations and configuration are then published before the first delivery is stored.

## features

- **Persistent inbox** — notifications remain with their read state, so recipients can still find them later.
- **Preferences at three levels** — a type, its group or the type default determines the channels; new types need no backfill.
- **Rules before via()** — availability, locked channels, the recipient's choice and a custom suppression rule decide in a fixed order.
- **Extensible channels** — inbox, live and mail are included; push, SMS and more channels remain your own implementations.
- **Deferred delivery** — a job checks held-back channels later and sends only when the notification is still unread.
- **Configurable schema** — models, table names, morph keys and key types can be adapted to the application.

## scope

The package ships neither a ready-made interface nor routes. Listing, marking and preferences are integrated through its actions and models in the existing controllers and frontend.

## install

```bash
composer require kirchdev/laravel-notification-delivery
php artisan vendor:publish --tag=notification-delivery-migrations
php artisan migrate
```

Configuration and keys must be published before migrating because the migrations read their table and key types from them at run time.
