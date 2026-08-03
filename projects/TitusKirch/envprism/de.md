# TUI für Environment-Dateien

TUI-basierter Manager für Environment-Dateien — bricht einen Satz Variablen in viele Umgebungs-Sichten auf.

## why

Die meisten Projekte sammeln eine Handvoll env-Dateien an — .env, .env.example, .env.staging, .env.production — und es gibt keine gute Möglichkeit, sie zusammen zu sehen. Man vergleicht zwei davon, übersieht die dritte und deployt eine Umgebung, in der eine Variable überall gesetzt war außer dort. Die Beispieldatei verrottet, weil niemand sie pflegt, wenn ein Schlüssel dazukommt.

envprism behandelt den ganzen Satz als eine Sache: jede Datei eine Spalte, jede Variable eine Zeile. Die Lücken springen ins Auge — dieser Schlüssel fehlt hier, jener Wert weicht dort ab, der da ist immer noch ein Platzhalter. Änderungen werden byte-genau zurückgeschrieben, und geheime Werte bleiben maskiert, damit die Ansicht teilbar ist.

## quickstart

```bash
bunx envprism
```

Findet alle .env*-Dateien im aktuellen Verzeichnis und öffnet sie als Matrix — ohne Installation und ohne Konfiguration.

## features

- **Matrix-Ansicht** — Unterschiede über beliebig viele Dateien hinweg sind auf einen Blick sichtbar, statt immer nur paarweise.
- **Diff je Zelle** — Symbole markieren abweichende Werte, fehlende und zusätzliche Schlüssel sowie nicht ausgefüllte Platzhalter wie CHANGEME oder TODO.
- **Geheimnisse maskiert** — Werte, deren Name nach Token, Secret oder Passwort aussieht, werden verdeckt dargestellt; die Ansicht ist damit auch im geteilten Bildschirm unbedenklich.
- **An Ort und Stelle bearbeiten** — jede Zelle lässt sich ändern; wer einen Schlüssel in einer Datei bearbeitet, die ihn noch nicht hat, legt ihn dort an. Dazu Hinzufügen, Löschen und Angleichen eines Werts über alle Dateien.
- **Byte-genaues Zurückschreiben** — nur die geänderten Schlüssel werden neu geschrieben; Kommentare, Leerzeilen, Reihenfolge, Quoting und export-Präfixe bleiben unangetastet.
- **Abschnitte und Filter** — nach Kommentarbanner oder Schlüsselpräfix gruppieren, Abschnitte einklappen, live nach Schlüsseln filtern oder nur die abweichenden anzeigen.
- **Rückgängig** — die letzten Änderungen, Ergänzungen und Löschungen lassen sich zurücknehmen, bevor geschrieben wird.
- **Für CI geeignet** — ein Drift-Bericht als Text oder JSON, oder nur ein Exit-Code für Pre-Commit-Hooks und Pipelines.

## install

```bash
bun add -g envprism
bunx envprism  # ohne Installation
```
