# Wiederverwendbare GitHub-Actions-Workflows für eine ganze Estate

Der Rumpf eines Workflows liegt einmal zentral, jedes andere Repository trägt nur noch einen Aufruf samt Auslöser. Ein Fix wird einmal geschrieben, und alle übernehmen ihn beim nächsten Bump.

## why

Die kanonischen Workflows lagen vorher in einer Vorlage und wurden in jedes neue Repository kopiert, wo sie sofort auseinanderliefen. Über die 27 Repositories beider Eigentümer gemessen: Der CI-Workflow existierte in 25 Repositories als 24 Varianten, der zum Landen der Queue in 26 Repositories als 8 Varianten zwischen 189 und 397 Zeilen, die Code-Analyse in 18 als 15.

Den Punkt beweist der Ausreißer: Ein Workflow lag in 20 Repositories byte-identisch, 760 Zeilen für eine einzige Sache. Ein Fix bedeutete zwanzig Commits, und nichts sagte einem, welches Repository man dabei übersehen hatte. Ein Aufruf hat dieses Problem nicht, weil der Rumpf nur an einer Stelle steht.

## quickstart

```yaml
jobs:
  promotion-pr:
    uses: kirchDev/workflows/.github/workflows/_promotion-pr.yml@9f3c1a2
```

Der Aufruf im Repository trägt den Auslöser und sonst nichts. Acht Zeilen, an denen nichts mehr driften kann.

## features

- **Rumpf und Aufruf getrennt** — der Auslöser bleibt in dem Repository, in dem er feuert, die Logik liegt zentral und wird dort einmal gepflegt.
- **Die Topologie ist die Konfiguration** — der Promotion-Pull-Request findet sein Ziel selbst, indem er prüft, ob ein Stage-Branch existiert. Kein Schalter, keine zweite Variante.
- **Auf einen Commit festgenagelt** — Aufrufer pinnen einen SHA, ein Push in die Rümpfe erreicht also niemanden, bevor ein Bump geprüft und gemerged ist.
- **Benannte Secrets** — ein Aufruf reicht genau das durch, was sein Rumpf braucht, statt pauschal alles zu vererben.
- **Am eigenen Futter geprüft** — dieses Repository trägt denselben Aufruf wie alle anderen und ruft die eigenen Rümpfe über lokale Pfade auf, ein kaputter Rumpf fällt also hier zuerst auf.

## scope

Keine allgemeine Sammlung von Actions. Die Rümpfe kodieren die Branch-Topologie dieser Estate, die Ablage der Secrets je Eigentümer und die hauseigene Coverage-Action; wer sie einbindet, übernimmt diese Konventionen mit.

Im aufrufenden Repository bleibt außerdem, was dorthin gehört: die Deploy-Jobs und der manuelle Auslöser, der eine Queue landet. Ein wiederverwendbarer Workflow lässt sich nicht dispatchen, weshalb genau dieser menschliche Halt nachweislich in dem Repository liegt, das er schützt.
