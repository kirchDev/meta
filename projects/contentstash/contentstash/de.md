# Headless CMS auf Laravel-Basis

Verwaltet Inhalte mit den Mitteln, die eine Laravel-Anwendung ohnehin hat, also Eloquent, Policies und Migrationen, und liefert sie über eine REST-API aus.

## why

Ein Headless CMS soll Inhalte verwalten und über eine API ausliefern, ohne die Darstellung vorzugeben. Die verbreiteten Lösungen bringen dafür ihren eigenen Unterbau mit, vom ORM bis zu den Erweiterungswegen. In einem Laravel-Haus heißt das: ein zweiter Stack, der betrieben und aktualisiert werden will, oft in einer anderen Sprache.

contentstash setzt stattdessen auf das, was ohnehin da ist. Ein Inhaltstyp ist ein gewöhnliches Eloquent-Modell, und der Rest folgt daraus: Wer Zugriff regelt, schreibt eine Policy, wer das Schema ändert, eine Migration. Was das CMS kann, erweitert man mit denselben Mitteln wie den Rest der Anwendung.

## features

- **Inhaltstypen aus Feldtypen** — string, text, integer, bigInteger, boolean, json und timestamp, dieselben Spaltentypen wie in einer Migration.
- **Schema-Änderungen werden zu Migrationen** — legt man einen Inhaltstyp an, ändert ihn oder entfernt ihn, entsteht daraus eine echte Migrationsdatei statt einer Ad-hoc-Schemaänderung.
- **REST-API je Ressource** — Lesen, Anlegen, Ändern und Löschen stehen für jeden Inhaltstyp bereit, sobald er definiert ist.
- **Rollen und Rechte je Modell** — Auflisten, Ansehen, Anlegen, Ändern und Löschen sind einzeln vergebbar, über Systemrollen von Gast bis Administrator.
- **Öffentlicher Lesezugriff** — Inhalte lassen sich für nicht angemeldete Besucher freigeben, ohne dafür einen eigenen Endpunkt zu bauen.
- **Eigene Feldtypen über eine Registry** — zusätzliche Attributtypen werden angemeldet statt in den Kern geschrieben; die eingebauten nutzen denselben Weg.

## scope

contentstash rendert keine Inhalte: Es liefert sie über die REST-API aus, und wie sie dargestellt werden, entscheidet die konsumierende Anwendung.
