# Policy-basierte Zugriffssteuerung für Laravel

Rollen und Berechtigungen an einer Stelle statt verstreut im Code — mit Mandantentrennung, Anbindung an Laravels Gate und einem Cache je Anfrage.

## why

Sobald eine Anwendung mehr als eine Rolle kennt, wachsen die Berechtigungsprüfungen in den Code hinein: hier eine Abfrage auf die Rolle, dort ein Vergleich auf die Organisation, an dritter Stelle eine Sonderregel. Wer später beantworten soll, warum ein Benutzer etwas darf, muss die halbe Anwendung lesen.

Dieses Paket zieht die Entscheidung an eine Stelle und hängt sie an Laravels eigenes Gate, statt daneben ein zweites Berechtigungssystem aufzumachen. Vorhandene Aufrufe funktionieren unverändert weiter; die Antwort kommt nun aus Rollen und Berechtigungen, bei Bedarf im Kontext einer Organisation.

## quickstart

```php
Pbac::withOrganisation($org->id, fn () => $user->can('members.invite'));
```

Innerhalb des Blocks gelten die Rollen dieser Organisation; außerhalb bleibt der Benutzer, was er sonst ist.

## features

- **Rollen und Berechtigungen** — schlichte Eloquent-Modelle, die sich gegen eigene austauschen lassen, samt UUID-, ULID- oder Integer-Schlüsseln.
- **Mandantentrennung** — organisationsbezogene Autorisierung mit austauschbarer Auflösung; Geltungsbereiche laufen nicht ineinander über.
- **Native Gate-Einbindung** — can, allows und inspect funktionieren wie gewohnt, mit Rückfall auf die bereits vorhandenen Laravel-Gates.
- **Entscheidungs-Cache je Request** — wiederholte Prüfungen innerhalb einer Anfrage kosten nichts und werden bei Änderungen an Rollen oder Rechten automatisch verworfen.
- **Nachvollziehbare Entscheidungen** — optional wird protokolliert, warum eine Prüfung so ausging, wie sie ausging; in Produktion standardmäßig geschwärzt.
- **Octane-fest** — optionale Listener setzen den Zustand am Ende einer Anfrage zurück, sodass zwischen zwei Requests nichts stehen bleibt.
- **Durchgehend konfigurierbar** — Modelle, Tabellen, Spalten und Schlüsseltypen sind überschreibbar, UUID-Installationen funktionieren ohne Zutun.

## install

```bash
composer require kirchdev/laravel-pbac
```
