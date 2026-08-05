# Policy-basierte Zugriffssteuerung für Laravel

Rollen und Berechtigungen an einer Stelle statt verstreut im Code, mit Mandantentrennung, Anbindung an Laravels Gate und einem Cache je Anfrage.

## why

Sobald eine Anwendung mehr als eine Rolle kennt, wachsen die Berechtigungsprüfungen in den Code hinein: hier eine Abfrage auf die Rolle, dort ein Vergleich auf die Organisation, dazu die eine oder andere Sonderregel. Wer später beantworten soll, warum ein Benutzer etwas darf, muss die halbe Anwendung lesen.

Dieses Paket bündelt die Entscheidung und hängt sie an Laravels eigenes Gate, statt daneben ein zweites Berechtigungssystem aufzumachen. Vorhandene Aufrufe funktionieren unverändert weiter; die Antwort kommt nun aus Rollen und Berechtigungen, bei Bedarf im Kontext einer Organisation.

## quickstart

```php
Pbac::withOrganisation($org->id, fn () => $user->can('members.invite'));
```

Ist die Mandantentrennung in der Konfiguration aktiviert, gelten im Block die Rollen dieser Organisation zusätzlich zu den globalen; außerhalb bleibt der Benutzer, was er sonst ist.

## features

- **Mandantentrennung** — organisationsbezogene Autorisierung mit austauschbarer Auflösung; Geltungsbereiche laufen nicht ineinander über.
- **Native Gate-Einbindung** — can, allows und inspect funktionieren wie gewohnt, mit Rückfall auf die bereits vorhandenen Laravel-Gates.
- **Entscheidungs-Cache je Anfrage** — wiederholte Prüfungen innerhalb einer Anfrage kosten nichts und werden bei Änderungen an Rollen oder Rechten automatisch verworfen.
- **Nachvollziehbare Entscheidungen** — jede Prüfung trägt ihren Entscheidungsweg, auf Wunsch wird er protokolliert; in Produktion ist er standardmäßig geschwärzt.
- **Octane-fest** — optionale Listener setzen den Zustand am Ende einer Anfrage zurück, sodass zwischen zwei Anfragen nichts stehen bleibt.
- **Austauschbar** — Rollen und Berechtigungen sind schlichte Eloquent-Modelle; Modelle, Tabellen, Spalten und Schlüsseltypen lassen sich überschreiben, Schlüssel wahlweise als UUID, ULID oder Integer.

## scope

Berechtigungen fließen ausschließlich über Rollen: Eine Direktvergabe an einzelne Benutzer gibt es bewusst nicht, ebenso wenig Wildcards oder ein eigenes Guard-Konzept. Fähigkeiten tragen explizite Namen und laufen über das Gate. Auch eigene Middleware und Blade-Direktiven bringt das Paket keine mit, denn Laravels can-Middleware und @can gehen ohnehin durch das Gate.

Wer von spatie/laravel-permission umsteigt, findet genau diese Unterschiede in einem eigenen Migrationsleitfaden ausgearbeitet, samt Artisan-Befehl für die Datenübernahme.

## install

```bash
composer require kirchdev/laravel-pbac
php artisan vendor:publish --tag=pbac-config
php artisan vendor:publish --tag=pbac-migrations
php artisan migrate
```

Der Config-Schritt ist optional, gehört aber vor die Migration, sobald Modelle, Tabellen oder Schlüsseltypen abweichen sollen: Die Schlüsseltypen wandern fest ins Schema.
