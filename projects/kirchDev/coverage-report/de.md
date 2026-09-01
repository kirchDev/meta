# Coverage am Pull Request, aus den Reports der eigenen CI

Meldet Gesamt-, Patch- und Delta-Coverage als einen dauerhaften Kommentar samt Check Run, gelesen aus den Coverage-Dateien, die der Lauf ohnehin schreibt.

## why

Kommentare mit Coverage gibt es als fertige Action mehrfach. Die erste Aufgabe war deshalb nicht, noch eine zu bauen, sondern die vorhandenen an einem echten Repository laufen zu lassen, mit Vitest und Pest nebeneinander und einem echten Pull Request. Vier Lücken kamen zurück, und die sind der ganze Umfang: Jede liest nur eine Formatfamilie, keine führt zwei Suiten zu einer Zahl zusammen, keine holt sich den Vergleichswert des Zielbranches selbst, und keine rechnet Patch-Coverage. Was die vorhandenen als geänderte Dateien anbieten, filtert nach Datei und listet darin dann doch jede unabgedeckte Zeile.

Ein Dienst von außen ist dafür nicht nötig. Die Zahlen entstehen im Workflow und verlassen ihn nicht.

## quickstart

```yaml
- uses: kirchDev/coverage-report@v0.3.0
  with:
    reports: |
      coverage/lcov.info
      coverage.xml
    min-patch: '80'
```

Zwei Suiten, eine Zahl, ein Kommentar am Pull Request.

## features

- **Vier Formate in einem Lauf** — lcov, Cobertura, Clover und Istanbul, erkannt am Inhalt statt am Dateinamen, weil coverage.xml im Laravel-Repository Clover ist und im .NET-Repository Cobertura.
- **Eine Zahl für ein Monorepo** — der Report aus JavaScript und der aus PHP werden zusammengeführt, und eine Zeile, die beide Suiten treffen, zählt einmal.
- **Patch-Coverage, die das Wort verdient** — das Diff wird auf die Trefferzeilen abgebildet, sodass die offenen Zeilen die sind, die diese Änderung angefasst hat, nicht die anderen vierhundert derselben Datei.
- **Der Vergleichswert bleibt im Repository** — die Coverage des Integrationsbranches liegt in einem verwaisten Branch, also braucht das Delta weder einen Dienst noch ein Artefakt mit Ablaufdatum.
- **Kommentar und Check Run** — der Kommentar wird über eine Marke wiedergefunden und bearbeitet statt gestapelt, dazu ein Check Run, auf den ein Branch-Schutz zugreifen kann.
- **Schwellen, die greifen oder schweigen** — mit einer Untergrenze scheitert der Lauf, ohne sie endet der Check neutral statt mit einem grünen Haken, den niemand verdient hat.

## scope

Gemessen wird nichts. Die Coverage-Dateien schreibt weiterhin die eigene Test-Suite, und ohne einen solchen Report hat die Action nichts zu lesen. Codecov ersetzt sie dort, wo es um Kommentar, Delta und Schwellen geht, und sonst nirgends: Es gibt keine Historie über Monate, keinen Blick über mehrere Repositories hinweg und keine Oberfläche außerhalb des Pull Requests.

## install

```yaml
- uses: kirchDev/coverage-report@v0.3.0
```

Dieselben Zahlen lokal, als CLI ohne die GitHub-Hälfte. Das macht eine Abweichung zwischen der Prüfung auf dem eigenen Rechner und dem Kommentar am Pull Request überhaupt erst nachvollziehbar.

```pnpm
pnpm add -D @kirchdev/coverage-report
```

```npm
npm install -D @kirchdev/coverage-report
```
