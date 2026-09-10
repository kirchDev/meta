# Zustellregeln und Inbox für Laravel-Benachrichtigungen

Ergänzt Laravels Benachrichtigungen um eine persistente Inbox, Lesezustand und Zustellpräferenzen je Empfänger. Eine Kette von Regeln entscheidet vor via(), über welche Kanäle eine Nachricht ankommt.

## why

Sobald eine Anwendung eine Benachrichtigungsglocke braucht, baut sie Speicherung, Lesezustand und Präferenzen selbst. Die Ergebnisse unterscheiden sich, obwohl Laravels Notifications, Kanäle und Notification::send() schon der passende Rahmen bleiben.

Dieses Paket ergänzt nur die fehlende Zustellschicht. Nachrichten haben weiterhin ihre Laravel-Typen und Kanäle, aber die Entscheidung über Inbox, Live-Hinweis, E-Mail und spätere Zustellung folgt einer nachvollziehbaren Regelkette.

## quickstart

```php
class User extends Authenticatable
{
    use HasNotificationDelivery;
    use RoutesNotifications;
}
```

Das Trait ersetzt Laravels Datenbank-Notifications auf dem Empfänger. Danach werden Migrationen und Konfiguration veröffentlicht, bevor die erste Zustellung gespeichert wird.

## features

- **Persistente Inbox** — Benachrichtigungen bleiben mit Gelesen-Status erhalten, damit Empfänger sie auch später noch finden.
- **Präferenzen auf drei Ebenen** — ein Typ, seine Gruppe oder die Vorgabe des Typs bestimmen die Kanäle; neue Typen brauchen kein Backfill.
- **Regeln vor via()** — Verfügbarkeit, gesperrte Kanäle, Empfängerwahl und eine eigene Unterdrückungsregel entscheiden in fester Reihenfolge.
- **Erweiterbare Kanäle** — Inbox, Live und E-Mail sind enthalten; Push, SMS und weitere Kanäle bleiben eigene Implementierungen.
- **Aufschiebbare Zustellung** — zurückgehaltene Kanäle prüft ein Job später erneut und sendet nur, wenn die Nachricht dann noch ungelesen ist.
- **Konfigurierbares Schema** — Modelle, Tabellennamen, Morph-Schlüssel und Schlüsseltypen lassen sich an die Anwendung anpassen.

## scope

Das Paket liefert weder eine fertige Oberfläche noch Routen. Listen, Markieren und Präferenzen werden über die Actions und Modelle in die vorhandenen Controller und das eigene Frontend eingebunden.

## install

```bash
composer require kirchdev/laravel-notification-delivery
php artisan vendor:publish --tag=notification-delivery-migrations
php artisan migrate
```

Vor der Migration müssen Konfiguration und Schlüssel veröffentlicht werden, weil die Migrationen ihre Tabellen- und Schlüsseltypen zur Laufzeit daraus lesen.
