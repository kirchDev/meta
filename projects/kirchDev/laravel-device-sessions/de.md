# Gerätegebundene Login-Sessions für Laravel

Gerätegebundene Login-Sessions für Laravel: Remember-Me-Token pro Gerät, eine Geräteliste „Wo bin ich angemeldet“ sowie Abmelden und Umbenennen — datensparsam und Fortify-unabhängig.

## why

Laravel merkt sich genau ein Remember-Me-Token je Benutzer, in einer einzelnen Spalte. Daraus folgen zwei Ärgernisse: Wer sich auf dem Telefon abmeldet, fliegt auch am Rechner raus — und niemand kann sehen, welche Geräte überhaupt angemeldet sind. Nach einem verlorenen Laptop bleibt nur, das Passwort zu ändern und zu hoffen.

Dieses Paket bindet je Gerät ein eigenes Token an eine Gerätezeile und ein Cookie. Damit wird die Liste der angemeldeten Geräte darstellbar, einzelne lassen sich gezielt abmelden, und die üblichen Daten dazu — System, Name, IP — werden datensparsam behandelt.

## quickstart

```php
use KirchDev\DeviceSessions\Concerns\HasDeviceSessions;

class User extends Authenticatable
{
    use HasDeviceSessions;
}
```

Dazu der gerätebewusste Treiber in der Auth-Konfiguration — mehr braucht es nicht, damit die Geräteliste steht.

## features

- **Gerätegebundenes Remember-Me** — ein eigener Treiber koppelt jedes Token an eine Gerätezeile und ein Cookie statt an eine einzelne Spalte; je Gerät ein aktives Token, das bei der Anmeldung rotiert.
- **Wo bin ich angemeldet** — aktive Geräte auflisten samt System, sprechendem Namen, maskierter IP und letztem Zugriff; einzeln abmelden, alle anderen abmelden oder umbenennen.
- **Datensparsam** — IP-Adressen werden standardmäßig gekürzt gespeichert, und die Maskierung ist über einen Vertrag austauschbar.
- **Fortify-unabhängig** — funktioniert unter jedem Login-Mechanismus; die Brücke für den Zwei-Faktor-Cookie greift nur dann, wenn Fortify überhaupt vorhanden ist.
- **Überall überschreibbar** — Namensauswertung, System-Erkennung, Cookie-Verhalten, IP-Maskierung und Token-Hashing sind Verträge mit brauchbaren Voreinstellungen.
- **Schema konfigurierbar** — Modelle, Tabellennamen und Schlüsseltypen lassen sich festlegen, bevor migriert wird.
- **Ereignisgesteuert** — ein Ereignis bei jedem Gerätezugriff erlaubt eigene Reaktionen, ohne dass das Paket Annahmen über das übrige Schema trifft.

## install

```bash
composer require kirchdev/laravel-device-sessions
php artisan vendor:publish --tag=device-sessions-migrations
php artisan migrate
```
