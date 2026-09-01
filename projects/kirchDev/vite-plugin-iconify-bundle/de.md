# Vite-Plugin, das nur die benutzten Iconify-Icons bündelt

Durchsucht den Quelltext nach Icon-Namen, löst jeden zur Bauzeit gegen die installierten Collections auf und legt genau diese Icons ins Bundle. Zur Laufzeit wird die Iconify-API nicht mehr gefragt.

## why

Die übliche Einbindung holt die Icon-Daten zur Laufzeit von der Iconify-API. Das scheitert offline, rendert unter serverseitigem Rendern nichts und macht den Build unvorhersehbar. Stattdessen ganze Collections mitzuliefern tauscht das gegen Megabyte an Icons, die niemand benutzt.

Das Plugin geht den dritten Weg. Es sucht im Quelltext nach Zeichenketten der Form Präfix und Name, löst jede gegen die installierten Collections auf und erzeugt daraus ein virtuelles Modul, das genau diese Icons registriert. Im Bundle liegt danach, was tatsächlich im Code steht.

## quickstart

```ts
import 'virtual:iconify-bundle';
```

Ein einziger Import ohne Rückgabewert registriert jedes gefundene Icon. Danach funktionieren sie offline, rendern serverseitig und kosten keine Anfrage.

## features

- **Nur die benutzten Icons** — im Bundle liegt, was der Scan gefunden hat, nicht die vollständige Collection.
- **Ein Scan, keine Analyse** — gesucht wird über alle drei Zeichenketten-Begrenzer, ein Name im Kommentar zählt also mit. Das ist Absicht, denn so fällt ein falscher Name laut auf, statt still nichts zu rendern.
- **Unbekannte Namen halten den Build an** — ein Icon, das die installierte Collection nicht kennt, lässt den Build scheitern, statt eine Lücke auszuliefern.
- **Fünf Optionen** — alles Weitere ist Konvention.
- **Überlebt Hot Module Replacement** — wird eine Quelldatei bearbeitet, verfällt das virtuelle Modul, und ein neu geschriebener Icon-Name erscheint ohne Neustart.

## scope

Der Scan ist zugleich die Grenze. Namen, die erst zur Laufzeit zusammengesetzt werden, findet er nicht, eigenes SVG nimmt das Plugin nicht auf, die Icon-Daten verändert es nicht, und andere Bundler als Vite bedient es nicht.

Auf Nuxt ist die dortige Icon-Integration die passendere Wahl: Sie bringt denselben Scan bereits mit und fällt für eine nicht installierte Collection auf die API zurück, wo dieses Plugin den Build scheitern lässt.

## install

```pnpm
pnpm add -D @kirchdev/vite-plugin-iconify-bundle @iconify-json/lucide
```

```npm
npm install -D @kirchdev/vite-plugin-iconify-bundle @iconify-json/lucide
```

Je Collection, die gescannt werden soll, ein eigenes Datenpaket; das Plugin liest deren Daten zur Bauzeit von der Platte. Die Voreinstellung listet zwei Collections und ist mit einiger Sicherheit nicht die richtige, weshalb ein Präfix ohne Eintrag gar nicht erst gescannt wird.
