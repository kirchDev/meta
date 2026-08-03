# Headless-CMS-Ökosystem auf Laravel-Basis

Ein Headless-CMS-Ökosystem, gebaut mit Laravel, Inertia.js, Vue 3 und Tailwind CSS.

## why

Ein Headless CMS soll Inhalte verwalten und über eine API ausliefern, ohne die Darstellung vorzugeben. Die verbreiteten Lösungen bringen dafür ihren eigenen Unterbau mit — eigene Sprache, eigenes ORM, eigene Erweiterungswege —, was in einem Laravel-Haus bedeutet, einen zweiten Stack zu betreiben und zu aktualisieren.

contentstash setzt stattdessen auf das, was ohnehin da ist: Inhaltstypen sind Eloquent-Modelle, Rechte laufen über Policies, und eine Erweiterung ist ein Laravel-Paket. Was das CMS kann, erweitert man mit denselben Mitteln wie den Rest der Anwendung.

## features

- **Inhaltstypen aus Feldtypen** — Text, längerer Text, Ganzzahl, Wahrheitswert, JSON und Zeitstempel; letztere wahlweise als Datum, Uhrzeit oder beides.
- **Schema-Änderungen werden zu Migrationen** — legt man einen Inhaltstyp an, ändert ihn oder entfernt ihn, entsteht daraus die passende Migration, statt die Datenbank im Betrieb umzubauen.
- **REST-API je Ressource** — Lesen, Anlegen, Ändern und Löschen stehen für jeden Inhaltstyp bereit, sobald er definiert ist.
- **Rollen und Rechte je Modell** — Ansehen, Anlegen, Ändern und Löschen sind einzeln vergebbar, mit den Stufen Gast, angemeldet und Administrator.
- **Öffentlicher Lesezugriff** — Inhalte lassen sich für nicht angemeldete Besucher freigeben, ohne dafür einen eigenen Endpunkt zu bauen.
- **Über Plugins erweiterbar** — eigene Feldtypen und Erweiterungen werden über eine Registry angemeldet, statt den Kern zu verändern.

## scope

Der Anspruch ist ein Ökosystem, kein einzelnes Paket: Kern, Dokumentation und Beispielanwendung entstehen zusammen, damit sich Änderungen am Kern sofort an einer echten Anwendung zeigen.
