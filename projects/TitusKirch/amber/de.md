# Backup-Werkzeug für Git und GitHub

Soll Git-Repositories samt ihrer Forge-Metadaten sichern: Issues, Pull Requests, Releases und Labels, nicht nur die git-Historie.

## why

Ein git clone rettet den Code. Alles andere verschwindet, sobald ein Konto gesperrt oder eine Organisation gelöscht wird: die Diskussion in den Issues, die Kommentare an den Pull Requests, die Releases samt Notizen, die Labels und Meilensteine.

Diesen Teil soll amber mitsichern, neben dem git-Spiegel selbst.

## scope

Bisher steht nur das Projektgerüst: Linting, Formatierung, Commit-Hooks, CI und Release-Automatik. Die Umsetzung hat noch nicht begonnen, es gibt also weder ein Kommando noch ein installierbares Paket. Der Abschnitt oben beschreibt das Vorhaben, nicht den heutigen Funktionsumfang.
