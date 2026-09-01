# CLI, die eine .gitignore pflegt statt sie zu erzeugen

Hält kuratierte Blöcke in einer Region, die das Werkzeug besitzt, und rendert sie auf Zuruf neu. Alles außerhalb dieser Region bleibt unberührt.

## why

Die verbreiteten Werkzeuge holen und kippen aus: Man zieht sich einmal eine Vorlage, fügt sie ein und driftet von da an ab. Keines davon gleicht später noch einmal ab, und so wächst eine .gitignore zu ein paar hundert Zeilen Ballast, an die sich niemand mehr herantraut.

gitignore-sync hält stattdessen eine verwaltete Region in der Datei und rendert sie neu, so oft man will. Der Rest ist eine freie Zone, in die das Werkzeug nie schreibt. Genau das macht den zweiten Lauf ungefährlich und den hundertsten langweilig.

## quickstart

```bash
gitignore-sync init   # erkennen, bestätigen, Region schreiben
gitignore-sync sync   # neu rendern, beliebig oft
gitignore-sync check  # in der CI: Fehlercode bei Drift
```

Erkannt wird nur beim ersten Befehl. Ein später hinzugekommenes package.json schreibt die Datei nie von selbst um.

## features

- **Gleicht ab, statt neu auszukippen** — der Abgleich ist idempotent und gehört damit in eine Gewohnheit, einen Hook oder einen Cron statt in ein einmaliges Ritual.
- **Eigene Zeilen gehen nie verloren** — eine handgeschriebene Zeile innerhalb eines verwalteten Blocks wandert in die freie Zone, statt gelöscht zu werden. Diese Regel ist es, die den zweiten Lauf ungefährlich macht.
- **Entdoppelung, die git kennt** — exakte Dubletten fallen weg, aber .idea und .idea/ und /.idea sind für git drei verschiedene Muster und werden deshalb gemeldet, nie stillschweigend zusammengezogen.
- **Fängt den Fehler ab, der Ausnahmen aushebelt** — ein verirrter Eintrag neben einer Ausnahmeregel schaltet diese still ab, weil git in ein ignoriertes Verzeichnis nicht hineinschaut. Dafür gibt es eine eigene Warnung.
- **Klappt im Editor zusammen** — die Region ist als Faltbereich ausgezeichnet, sodass ein vierzig Zeilen langer Block auf eine Zeile einklappt.
- **Ein echtes Tor für die CI** — die Prüfung meldet Drift und Dubletten und endet mit einem Fehlercode, sodass ein veralteter Block den Build scheitern lässt statt zu verrotten.

## scope

Es gibt bisher weder ein Release noch ein veröffentlichtes Paket, die Version steht auf 0.0.0. Die Befehle oben laufen heute aus einem Klon, nicht aus einer Installation.

Über die Datei hinaus reicht das Werkzeug ohnehin nicht: Was ignoriert wird, entscheidet weiterhin git allein, und eine Datei, die bereits versioniert ist, holt kein Eintrag zurück.
