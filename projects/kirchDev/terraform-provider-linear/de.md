# OpenTofu-/Terraform-Provider für Linear

Den Linear-Workspace als Code verwalten: Teams, Labels, Workflow-States, Views, Git-Automation und Workspace-Einstellungen, abgeglichen durch OpenTofu.

## why

Ein Linear-Team besteht aus mehr als seinem Namen: eigene Workflow-States, Labels auf mehreren Ebenen, geteilte Views und Git-Automation je Ereignis. Ein weiteres Team genauso einzurichten heißt, all das in der Oberfläche noch einmal nachzuklicken.

Als Code ist ein Team ein Modul: einmal beschrieben, für das nächste mit anderen Werten erneut angewendet. Was ein Team ausmacht, steht dabei beieinander; die Oberfläche verteilt es über mehrere Einstellungsdialoge.

## quickstart

```hcl
resource "linear_custom_view" "in_review" {
  name    = "In Review"
  team_id = linear_team.eng.id
  shared  = true

  filter_json = jsonencode({
    state = { type = { eq = "started" } }
  })
}
```

Eine geteilte Ansicht als Code, versioniert und nachvollziehbar wie der Rest der Infrastruktur.

## features

- **Views inbegriffen** — mit Team-, Projekt- und Initiativen-Bezug; Filter werden als JSON ausgedrückt und inhaltlich verglichen, damit eine serverseitig normalisierte Fassung nicht als Abweichung erscheint.
- **Vollständige Workspace-Einstellungen** — jedes Feld, das die API annimmt, nicht nur eine bequeme Auswahl davon.
- **Git-Automation je Ereignis** — Entwurf, Start, Review, Merge-bereit und Merge sind je eine eigene Ressourcen-Instanz statt eines Blocks für alle fünf, und jede lässt sich einzeln importieren.
- **Webhooks als Ressource** — der Callback, den Linear bei Änderungen abonnierter Ressourcen sendet, lässt sich deklarieren; bezogen auf ein einzelnes Team oder alle öffentlichen Teams.
- **Releases abbildbar** — auch Release-Pipelines und ihre Stufen sind Ressourcen.

## scope

Der Geltungsbereich ist bewusst die Workspace-Konfiguration. Issues, Projekte, Initiativen, Dokumente und Kommentare sind Inhalt: Sie gehören in Linears Oberfläche und dessen API, nicht in eine State-Datei.

## install

```hcl
terraform {
  required_providers {
    linear = {
      source  = "kirchdev/linear"
      version = "~> 0.1"
    }
  }
}

provider "linear" {
  token = var.linear_token # oder LINEAR_TOKEN
}
```
