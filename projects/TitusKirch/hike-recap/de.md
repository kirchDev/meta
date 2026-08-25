# Hochkant-Video aus GPX-Tracks

Macht aus den GPX-Dateien eines Wanderurlaubs ein einziges Video im Hochformat, in dem sich jede Tour nacheinander auf eine Karte zeichnet.

## why

Wer eine Wanderwoche zusammenfassen will, landet schnell bei einem Kartendienst. Deren kostenlose Stufen setzen entweder ein Logo ins Bild oder untersagen die Verwendung im Video, und die Nutzungsbedingungen sind das Uninteressanteste an einem Wanderfilm.

hike-recap verzichtet deshalb ganz auf Kartenkacheln. Schummerung und Höhenlinien werden aus offenen Höhendaten gerechnet, Landbedeckung und Beschriftung kommen aus einem OpenStreetMap-Auszug, gezeichnet wird als SVG mit einer Canvas-Ebene darüber. Übrig bleibt eine kurze Zeile mit den Datenquellen, weil deren Lizenzen sie verlangen.

## quickstart

```bash
pnpm fetch:geodata && pnpm ingest && pnpm render
```

Drei Schritte auf einem Ordner voller GPX-Dateien: Geodaten holen, Touren einlesen, rendern. Am Ende steht eine MP4-Datei in 1080 × 1920.

## features

- **Karte ohne Kartenserver** — keine Kacheln, kein Schlüssel, kein Kontingent und kein fremdes Logo im Bild.
- **Mitwachsender Ausschnitt** — die Ansicht beginnt eng an der ersten Tour und zieht sich vor jeder weiteren so weit zurück, dass alles bereits Gezeichnete im Bild bleibt.
- **Gleichmäßiges Tempo** — die Zeichendauer richtet sich nach der Länge einer Tour, sodass der laufende Punkt überall gleich schnell bleibt.
- **Nur bestiegene Gipfel** — beschriftet wird ein Gipfel dann, wenn eine Tour ihn wirklich berührt; zugeordnet wird über die Koordinate, weil Gipfelnamen sich innerhalb einer Region wiederholen.
- **Beliebige Region und Sprache** — Zoomstufe, Höhenfarben und Streckenfarben ergeben sich aus den Daten, die Beschriftung kommt aus einer Sprachdatei.

## scope

hike-recap ist kein Videoschnittprogramm und kein allgemeiner Kartenrenderer. Es erzeugt genau eine Form: mehrere Touren, die sich nacheinander auf eine gemeinsame Karte zeichnen. Schnitt, Musik, Übergänge oder Titelbilder gibt es nicht.

Auch die Kennzahlen kommen nicht aus den Tracks. Distanz, Auf- und Abstieg sowie Dauer stehen in einer Datei neben den GPX-Dateien, weil Exporte häufig gar keine Höhen mitliefern und ihre Distanzen auseinanderlaufen.

## install

```bash
git clone https://github.com/TitusKirch/hike-recap.git
cd hike-recap
pnpm install
pnpm exec playwright install --with-deps chromium
```

Vorausgesetzt werden Node ab 24, pnpm 11 und ffmpeg. Höhendaten und OpenStreetMap-Auszug liegen nicht im Repository, weil sie immer nur für eine Region gelten; der erste der drei Schritte oben baut sie aus den eigenen Tracks.
