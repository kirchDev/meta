# Gerätegebundene Login-Sessions für Laravel

Ein Remember-Me-Token je Gerät statt eines einzigen pro Benutzer, mit Geräteliste, gezieltem Abmelden und Umbenennen, datensparsam und Fortify-unabhängig.

## why

Laravel merkt sich genau ein Remember-Me-Token je Benutzer, in einer einzelnen Spalte. Daraus folgen zwei Ärgernisse: Wer sich auf dem Telefon abmeldet, fliegt auch am Rechner raus, und niemand kann sehen, welche Geräte überhaupt angemeldet sind. Nach einem verlorenen Laptop bleibt nur, das Passwort zu ändern und zu hoffen.

Dieses Paket bindet je Gerät ein eigenes Token an eine Gerätezeile und ein Cookie. Damit wird die Liste der angemeldeten Geräte darstellbar, einzelne lassen sich gezielt abmelden, und die üblichen Daten dazu, also System, Name und IP, werden datensparsam behandelt.

## quickstart

```php
use KirchDev\DeviceSessions\Concerns\HasDeviceSessions;

class User extends Authenticatable
{
    use HasDeviceSessions;
}
```

Dazu der gerätebewusste Provider-Treiber in der Auth-Konfiguration und die mitgelieferte Middleware auf den angemeldeten Routen, damit steht die Geräteliste.

## features

- **Gerätegebundenes Remember-Me** — ein eigener Treiber koppelt jedes Token an eine Gerätezeile und ein Cookie statt an eine einzelne Spalte; je Gerät ein aktives Token, das bei der Anmeldung rotiert.
- **Wo bin ich angemeldet** — aktive Geräte auflisten samt System, sprechendem Namen, maskierter IP und letztem Zugriff; einzeln abmelden, alle anderen abmelden oder umbenennen.
- **Datensparsam** — IP-Adressen werden standardmäßig gekürzt gespeichert, und die Maskierung ist über einen Vertrag austauschbar.
- **Fortify-unabhängig** — funktioniert unter jedem Login-Mechanismus; die Brücke für den Zwei-Faktor-Cookie greift nur dann, wenn Fortify überhaupt vorhanden ist.
- **Überall überschreibbar** — Namensauswertung, System-Erkennung, Cookie-Verhalten, IP-Maskierung und Token-Hashing sind Verträge mit brauchbaren Voreinstellungen.
- **Fügt sich ins vorhandene Schema** — Schlüsseltyp id, uuid oder ulid, damit der Fremdschlüssel auf die bestehende users-Tabelle passt; Tabellennamen und Modelle sind austauschbar, und die Migrationen lesen all das erst zur Laufzeit.
- **Ereignisgesteuert** — ein Ereignis, sobald der letzte Zugriff eines Geräts geschrieben wird (standardmäßig auf einmal pro Minute gedrosselt), erlaubt eigene Reaktionen, ohne dass das Paket Annahmen über das übrige Schema trifft.

## scope

Widerrufen trennt die Remember-Me-Ebene, nicht die laufende Session: Das Gerät kommt über sein Cookie nicht wieder herein, aber eine dort noch offene PHP-Session läuft weiter, bis sie abläuft oder der Benutzer sich abmeldet; in den Session-Store schreibt das Paket nie. Ein UI liefert es ebenso wenig mit: keine Routen, keine Views; Auflisten, Widerrufen und Umbenennen sind Actions für die eigenen Controller.

## install

```bash
composer require kirchdev/laravel-device-sessions
php artisan vendor:publish --tag=device-sessions-migrations
php artisan migrate
```
