# CLI für ein aufgeräumtes lokales Repo-Layout

Verwaltet lokale Klone in einem festen Layout aus Server, Organisation und Repository-Name und baut darauf Suche, Massen-Sync und gefahrloses Aufräumen auf.

## why

Klone landen dort, wo man beim Klonen gerade stand: mal im Projektordner, mal daneben, mal unter abweichendem Namen. Wächst die Zahl, ist nicht mehr zu überblicken, welche Repositories lokal liegen, welche davon ungepushte Arbeit enthalten und welche gefahrlos weg könnten.

forgemap legt ein Layout aus Server, Organisation und Repository-Name fest und hält sich daran. Weil der Pfad damit vorhersagbar ist, funktionieren Suche und Wechseln wieder, und Massenoperationen werden möglich: Ein Sync erfasst alle Klone auf einmal, und gelöscht wird nur, was nachweislich gesichert ist.

## quickstart

```bash
$ forgemap clone kirchDev/laravel-pbac
✔ Cloned kirchDev/laravel-pbac → ~/projects/comGithub/kirchDev/laravel-pbac
```

Der Zielpfad ergibt sich aus der Konfiguration, nicht aus dem Verzeichnis, in dem der Befehl läuft.

## features

- **Vorhersagbares Layout** — jeder Klon landet unter Server, Namensraum und Repository-Name; GitLab-Untergruppen bleiben als Verzeichnisebenen erhalten.
- **Flexible Kurzschreibweise** — Eigentümer und Name, vollständige HTTPS-URLs oder SSH; selbst eine eingefügte Merge-Request-URL wird noch zum richtigen Repository aufgelöst.
- **Liste und unscharfe Suche** — alle lokalen Repositories auflisten oder nach Eigentümer und Name filtern; Wechseln, Pfad ausgeben und im Dateimanager öffnen verstehen dieselben Suchbegriffe.
- **Je Server das passende Werkzeug** — GitHub über gh, GitLab über glab samt Untergruppen; jeder andere Host wird als git-Typ eingetragen und über schlichtes git clone bedient.
- **Massen-Sync und Status** — alle Klone parallel aktualisieren und je Repository Branch, offene Änderungen und Abstand zum Remote anzeigen, wahlweise eingegrenzt auf einzelne Eigentümer oder Server.
- **Bestehende Bäume übernehmen** — ein bereits passend abgelegter Ordner wird eingelesen, gegen die git-Remotes abgeglichen und in eine Konfiguration überführt.
- **Sicheres Aufräumen** — lange unberührte Klone werden nur gelöscht, wenn sie sauber sind, vollständig gepusht, ohne Stash und am Remote noch vorhanden; standardmäßig geht nichts Ungesichertes verloren.
- **Shell-Integration** — ein echtes Verzeichniswechseln samt Tab-Vervollständigung wird in einem Schritt eingerichtet.

## scope

forgemap verwaltet die lokale Seite: wo Klone liegen und wann sie weg können. In Richtung Server klont und liest es nur; verändert wird dort nichts, und selbst das Löschen trifft immer nur den lokalen Klon. gh und glab ersetzt es nicht: Fürs Klonen ruft forgemap die beiden selbst auf, und für Issues, Merge Requests oder Releases bringt es gar keine Befehle mit.

## install

```pnpm
pnpm add -g forgemap
```

```npm
npm install -g forgemap
```

Vorausgesetzt wird Node ab 24 sowie git auf dem PATH; gh und glab braucht es nur, wenn ein entsprechender Forge-Typ konfiguriert ist.
