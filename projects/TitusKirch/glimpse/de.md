# Schlanker, git-nativer Desktop-Client

Der vollständige Branch-Graph, Diffs und der git-Alltag in einer Oberfläche, die das echte git aufruft, WSL eingeschlossen.

## why

Die meisten git-Oberflächen bauen git nach: Sie bringen eine eigene Implementierung mit und weichen dort ab, wo die eigene Konfiguration, Hooks oder Anmeldedaten ins Spiel kommen. Die anderen liefern einen kompletten Browser mit, nur um den Verlauf anzuzeigen.

glimpse ruft das echte git-Binary auf und liest dessen Ausgabe. Damit gelten die eigene Konfiguration, die Hooks und die hinterlegten Anmeldedaten weiter, Signaturen funktionieren wie eingerichtet, und der Client speichert selbst keine Geheimnisse.

## features

- **Klein und schnell** — die Anwendung nutzt die WebView des Betriebssystems, statt einen eigenen Browser mitzubringen; das spart Platz auf der Platte und Arbeitsspeicher im Betrieb.
- **Git-nativ** — es wird nichts an git vorbeigeschrieben; Signaturen mit GPG oder SSH greifen, wenn sie eingerichtet sind, und per LFS verwaltete Dateien werden erkannt.
- **WSL ohne Einrichtung** — ein Repository unter \\wsl$ wird automatisch über das git der jeweiligen Distribution bedient, eines unter einem Windows-Pfad über das Windows-git.
- **Graph und Verlauf** — der vollständige Mehr-Branch-Graph, Suche nach Nachricht oder nach Inhalt, Signaturprüfung je Commit und eine Statistik über Beitragende und Aktivität.
- **Diffs in jeder Form** — nebeneinander, vereinheitlicht oder als ganze Datei, mit Syntaxhervorhebung, Wort-Diff, einklappbaren unveränderten Bereichen, Bild-Diffs, Blame und Dateiverlauf.
- **Bis auf die Zeile stagen** — nach Datei, Hunk oder einzelner Zeile, dazu Amend und ein Drei-Wege-Editor, der Konflikte Abschnitt für Abschnitt auflöst.
- **Changelists** — offene Änderungen in benannte Gruppen legen und eine davon committen; die Zuordnung liegt als lesbare JSON-Datei im .git-Verzeichnis des Repositorys und ist über eine mitgelieferte CLI auch für Skripte und Agenten erreichbar.
- **Fortgeschrittenes git** — Rebase interaktiv oder auf eine Referenz, geführtes Bisect, eine Reflog-Ansicht, die verlorene Stände zurückholt und die letzte Aktion rückgängig macht, Patches exportieren und anwenden, dazu Worktrees, Submodule und Sparse-Checkout.

## scope

Ein git-Client, kein Forge-Client: Mit dem Remote spricht glimpse ausschließlich über git, also fetch, pull und push. Pull Requests und Issues bekommen keine Ansicht; die bleiben im Browser.

## install

Die zum System passende Datei herunterladen und ausführen; ab da hält sich die Anwendung über den eingebauten Updater selbst aktuell. Einen Paketmanager-Eintrag gibt es nicht.
