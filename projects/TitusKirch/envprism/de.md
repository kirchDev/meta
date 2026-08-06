# TUI für Environment-Dateien

Alle .env-Dateien eines Projekts nebeneinander in einer Matrix, eine Sicht für den ganzen Variablensatz statt für eine Datei allein.

## why

Die meisten Projekte sammeln eine Handvoll env-Dateien an, von .env über .env.example bis .env.staging und .env.production, und es gibt keine gute Möglichkeit, sie zusammen zu sehen. Man vergleicht zwei davon, übersieht die dritte und deployt am Ende eine Umgebung, in der genau eine Variable fehlt. Die Beispieldatei veraltet, weil niemand sie nachzieht, sobald ein Schlüssel dazukommt.

envprism behandelt den ganzen Satz als eine Sache: jede Datei eine Spalte, jede Variable eine Zeile. Die Lücken springen ins Auge, weil hier ein Schlüssel fehlt, dort ein Wert abweicht und anderswo noch ein Platzhalter steht.

## quickstart

```bash
bunx envprism
```

Findet alle .env*-Dateien im aktuellen Verzeichnis und öffnet sie als Matrix. Ohne Installation, ohne Konfiguration.

## features

- **Matrix-Ansicht** — Unterschiede über beliebig viele Dateien hinweg sind auf einen Blick sichtbar, statt immer nur paarweise.
- **Diff je Zelle** — Symbole markieren abweichende Werte, fehlende und zusätzliche Schlüssel sowie nicht ausgefüllte Platzhalter wie CHANGEME oder TODO.
- **Geheimnisse maskiert** — Werte, deren Name nach Token, Secret oder Passwort aussieht, werden verdeckt dargestellt; die Ansicht ist damit auch beim Teilen des Bildschirms unbedenklich.
- **An Ort und Stelle bearbeiten** — jede Zelle lässt sich ändern; wer einen Schlüssel in einer Datei bearbeitet, die ihn noch nicht hat, legt ihn dort an. Dazu Hinzufügen, Löschen und Angleichen eines Werts über alle Dateien.
- **Byte-genaues Zurückschreiben** — nur die geänderten Schlüssel werden neu geschrieben; Kommentare, Leerzeilen, Reihenfolge, Quoting und export-Präfixe bleiben unangetastet.
- **Abschnitte und Filter** — nach Kommentarbanner oder Schlüsselpräfix gruppieren, Abschnitte einklappen, live nach Schlüsseln filtern oder nur die abweichenden anzeigen.
- **Für CI geeignet** — ein Drift-Bericht als Text oder JSON, oder nur ein Exit-Code für Pre-Commit-Hooks und Pipelines.

## scope

Kein Secret-Manager und kein Ersatz für einen Vault: envprism zeigt und bearbeitet lokale env-Dateien, und die Maskierung betrifft allein die Darstellung. Geheimnisse speichert oder verwaltet es nicht.

## install

```bash
bun add -g envprism
bunx envprism  # ohne Installation
```

Vorausgesetzt wird Bun ab 1.3; unter Node läuft das Paket nicht.
