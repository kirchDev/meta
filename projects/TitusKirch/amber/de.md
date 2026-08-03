# Backup-Werkzeug für Git und GitHub

Sichert Git-Repositories samt vollständiger Forge-Metadaten — Issues, Pull Requests, Releases, Labels — nicht nur die git-Historie.

## why

Ein git clone rettet den Code. Was verschwindet, wenn ein Konto gesperrt, eine Organisation gelöscht oder ein Repository versehentlich entfernt wird, ist alles andere: die Diskussion in den Issues, die Reviews an den Pull Requests, die Releases samt Notizen, die Labels und Meilensteine, an denen die Arbeit hing.

Genau diesen Teil sichert amber mit. Das Repository wird als vollständiger Spiegel geklont, die Metadaten werden als JSON danebengelegt, und ein Manifest hält fest, was wann gesichert wurde. Die Ablage bleibt bewusst als Dateien und Ordner lesbar, statt in einem eigenen Archivformat zu verschwinden.

## quickstart

```bash
amber backup --token $GITHUB_TOKEN --out ./backups
```

Legt je Repository ein Verzeichnis mit dem git-Spiegel und den Metadaten an, dazu ein Manifest im Wurzelverzeichnis.

## features

- **Vollständiger git-Spiegel** — als Mirror geklont, also mit allen Branches, Tags und Refs statt nur dem Standard-Branch.
- **Metadaten, nicht nur Code** — Issues, Pull Requests samt Kommentaren, Labels, Meilensteine und Releases werden als JSON exportiert; genau das, was beim Verlust eines Kontos sonst weg ist.
- **Inkrementelle Läufe** — spätere Durchgänge holen anhand von Zeitstempeln nur, was sich seit dem letzten geändert hat.
- **Prüfbares Manifest** — ein Index im Wurzelverzeichnis hält fest, was wann gesichert wurde, mit Integritäts-Hashes je Artefakt.
- **Als Dateien lesbar** — der Spiegel und die JSON-Exporte liegen als gewöhnliche Ordner auf der Platte, nicht in einem eigenen Archivformat; wiederherstellen heißt kopieren.

## install

```bash
git clone https://github.com/TitusKirch/amber.git
cd amber
pnpm install
```
