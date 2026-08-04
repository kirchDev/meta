# OpenTofu-/Terraform-Provider für Linear

Den Linear-Workspace als Code verwalten — Teams, Labels, Workflow-States, Views, Git-Automation und Workspace-Einstellungen, abgeglichen durch OpenTofu.

## why

Ein Linear-Workspace sammelt Konfiguration an: Teams mit je eigenen Workflow-States, Labels in mehreren Ebenen, geteilte Views, Git-Automation je Ereignis. Das entsteht über Monate durch Klicken, und ein zweites Team konsistent gleich aufzusetzen wird zur Fleißarbeit.

Als HCL ist der Workspace nachvollziehbar und wiederholbar. Was ein Team ausmacht, steht an einer Stelle, Änderungen laufen durch ein Review, und ein neues Team ist ein Modul statt einer Checkliste.

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

Eine geteilte Ansicht als Code — statt in der Oberfläche zusammengeklickt und nirgends dokumentiert.

## features

- **Linear als Code** — Teams, Labels, Workflow-States, Views, Git-Automation, Webhooks und Workspace-Einstellungen in HCL.
- **Views inbegriffen** — mit Team-, Projekt- und Initiativ-Bezug; Filter werden als JSON ausgedrückt und inhaltlich verglichen, damit eine serverseitig normalisierte Fassung nicht als Abweichung erscheint.
- **Vollständige Workspace-Einstellungen** — jedes Feld, das die API annimmt, nicht nur eine bequeme Auswahl davon.
- **Git-Automation je Ereignis** — Entwurf, Start, Review, Merge-bereit und Merge jeweils als eigene Ressource, sodass alle fünf beim Import sauber zurückgelesen werden.
- **Releases abbildbar** — auch Release-Pipelines und ihre Stufen sind Ressourcen.

## scope

Der Geltungsbereich ist bewusst die Workspace-Konfiguration. Issues, Projekte, Initiativen, Dokumente und Kommentare sind Inhalt — sie gehören in Linears Oberfläche und dessen API, nicht in eine State-Datei.

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
