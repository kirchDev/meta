# CLI für ein sortiertes lokales Repo-Layout

CLI, die ein lokales Repository-Layout nach Git-Server, Organisation und Repository-Name verwaltet.

## why

Klone sammeln sich dort an, wo man gerade war: einmal im Projektordner, einmal auf dem Schreibtisch, einmal unter einem Namen, den nur der damalige Kontext erklärt. Nach ein paar Dutzend Repositories weiß niemand mehr, welche lokal liegen, welche davon ungepushte Arbeit enthalten und welche man löschen könnte.

forgemap legt ein Layout fest — Server, Organisation, Repository-Name — und hält sich daran. Weil der Pfad damit vorhersagbar ist, funktionieren auch Suche, Wechseln und Massenoperationen wieder: alle Klone aktualisieren, überall den Status sehen, gefahrlos aufräumen.

## quickstart

```bash
$ forgemap clone kirchDev/laravel-pbac
✔ Cloned kirchDev/laravel-pbac → ~/projects/comGithub/kirchDev/laravel-pbac
```

Der Zielpfad ergibt sich aus der Konfiguration, nicht aus dem Verzeichnis, in dem der Befehl läuft.

## features

- **Vorhersagbares Layout** — jeder Klon landet unter Server, Namensraum und Repository-Name; GitLab-Untergruppen verschachteln sich so tief wie im Original.
- **Flexible Kurzschreibweise** — Eigentümer und Name, vollständige HTTPS-URLs oder SSH; selbst eine eingefügte Merge-Request-URL löst sich noch zum richtigen Repository auf.
- **Liste und unscharfe Suche** — alle lokalen Repositories auflisten oder nach Eigentümer und Name filtern; Wechseln, Pfad ausgeben und im Editor öffnen nehmen dieselben Suchbegriffe.
- **Server-bewusst** — GitHub über gh, GitLab über glab samt Untergruppen, alles andere über einfaches git clone ganz ohne Zusatzabhängigkeit.
- **Massen-Sync und Status** — alle Klone parallel aktualisieren und je Repository Branch, offene Änderungen und Abstand zum Remote anzeigen, wahlweise eingegrenzt auf einzelne Eigentümer oder Server.
- **Bestehende Bäume übernehmen** — ein bereits passend abgelegter Ordner wird eingelesen, gegen die git-Remotes abgeglichen und in eine Konfiguration überführt.
- **Sicheres Aufräumen** — lange unberührte Klone werden nur gelöscht, wenn sie sauber sind, vollständig gepusht, ohne Stash und am Remote noch vorhanden; nichts Ungesichertes geht verloren.
- **Shell-Integration** — ein echtes Verzeichniswechseln samt Tab-Vervollständigung wird in einem Schritt eingerichtet.

## install

```bash
npm install -g forgemap
```
