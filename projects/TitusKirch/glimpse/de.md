# Schlanker, git-nativer Desktop-Client

Ein schlanker, git-nativer Desktop-Client — der vollständige Branch-Graph, Diffs und der git-Alltag, mit erstklassiger WSL-Unterstützung.

## why

Die meisten git-Oberflächen bauen git nach: Sie bringen eine eigene Implementierung mit und weichen dort ab, wo die eigene Konfiguration, Hooks oder Anmeldedaten ins Spiel kommen. Die anderen liefern ein komplettes Chromium mit und brauchen für einen Blick auf den Verlauf mehrere hundert Megabyte Arbeitsspeicher.

glimpse ruft das echte git-Binary auf und liest dessen Ausgabe. Damit gelten Konfiguration, Hooks und Anmeldedaten unverändert weiter, Signaturen funktionieren wie eingerichtet, und der Client speichert selbst keine Geheimnisse. Die Oberfläche läuft in der WebView des Betriebssystems statt in einem mitgelieferten Browser.

## features

- **Klein und schnell** — die Anwendung nutzt die WebView des Betriebssystems, statt einen eigenen Browser mitzubringen; das spart Platz auf der Platte und Arbeitsspeicher im Betrieb.
- **Git-nativ** — es wird nichts an git vorbeigeschrieben; Signaturen mit GPG oder SSH greifen, wenn sie eingerichtet sind, und per LFS verwaltete Dateien werden erkannt.
- **WSL erstklassig** — ein Repository unter \\wsl$ wird automatisch über das git der jeweiligen Distribution bedient, eines unter einem Windows-Pfad über das Windows-git. Ohne Einrichtung.
- **Graph und Verlauf** — der vollständige Mehr-Branch-Graph, Suche nach Nachricht oder nach Inhalt, Signaturprüfung je Commit und eine Statistik über Beitragende und Aktivität.
- **Diffs in jeder Form** — nebeneinander, vereinheitlicht oder als ganze Datei, mit Syntaxhervorhebung, Wort-Diff, einklappbaren unveränderten Bereichen, Bild-Diffs, Blame und Dateiverlauf.
- **Bis auf die Zeile stagen** — nach Datei, Hunk oder einzelner Zeile, dazu Amend und ein Drei-Wege-Editor, der Konflikte Abschnitt für Abschnitt auflöst.
- **Changelists** — offene Änderungen in benannte Gruppen legen und eine davon committen; die Zuordnung liegt als lesbare JSON-Datei im Repository und ist über eine mitgelieferte CLI auch für Skripte und Agenten erreichbar.
- **Fortgeschrittenes git** — Rebase interaktiv oder auf eine Referenz, geführtes Bisect, Reflog-Wiederherstellung mit Rückgängig, Patches exportieren und anwenden, dazu Worktrees, Submodule und Sparse-Checkout.

## install

Windows als .exe, Linux als .deb, .rpm oder AppImage — die zum System passende Datei herunterladen und ausführen. Ab da hält sich die Anwendung über den eingebauten Updater selbst aktuell; einen Paketmanager-Eintrag gibt es nicht.
