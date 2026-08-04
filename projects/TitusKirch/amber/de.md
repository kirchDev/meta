# Backup-Werkzeug für Git und GitHub

Soll Git-Repositories samt vollständiger Forge-Metadaten sichern — Issues, Pull Requests, Releases, Labels — und nicht nur die git-Historie.

## why

Ein git clone rettet den Code. Was verschwindet, wenn ein Konto gesperrt, eine Organisation gelöscht oder ein Repository versehentlich entfernt wird, ist alles andere: die Diskussion in den Issues, die Reviews an den Pull Requests, die Releases samt Notizen, die Labels und Meilensteine, an denen die Arbeit hing.

Genau diesen Teil soll amber mitsichern. Vorgesehen ist ein vollständiger git-Spiegel mit allen Branches und Tags, daneben die Metadaten als JSON, dazu ein Manifest mit Integritäts-Hashes und inkrementelle Läufe, die beim zweiten Durchgang nur noch Geändertes holen. Die Ablage soll als gewöhnliche Ordner lesbar bleiben, damit Wiederherstellen schlicht Kopieren heißt.

## scope

Bisher steht nur das Projektgerüst: Linting, Formatierung, Commit-Hooks und CI. Die Umsetzung hat noch nicht begonnen, es gibt also weder ein Kommando noch ein installierbares Paket — der Abschnitt oben beschreibt das Vorhaben, nicht den heutigen Funktionsumfang.
