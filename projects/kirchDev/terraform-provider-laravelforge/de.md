# OpenTofu-/Terraform-Provider für Laravel Forge

Den gesamten Laravel-Forge-Bestand als Code verwalten: Server, Sites, Datenbanken, Daemons und SSL. Was jemand direkt in Forge geändert hat, zeigt der nächste Plan.

## why

Forge wird über die Oberfläche bedient, und was dort entsteht, existiert nur dort. Eine Staging-Umgebung, die der Produktion entspricht, muss von Hand nachgebaut werden und weicht ab dem ersten Handgriff wieder ab.

Als Code beschrieben ist eine zweite Umgebung dieselbe Definition mit anderen Variablen, und weil OpenTofu vor dem Anwenden vergleicht, deckt jeder Plan Abweichungen zum tatsächlichen Zustand auf.

## quickstart

```hcl
resource "laravelforge_site" "app" {
  organization = "your-org"
  server_id    = laravelforge_server.web.id
  type         = "php"
  name         = "app.example.com"
  php_version  = "php82"
}
```

Eine Site als Ressource, mit demselben Plan- und Apply-Zyklus wie die übrige Infrastruktur.

## features

Für nahezu jede Entität, die sich in Forge verwalten lässt, gibt es eine Ressource: Server, Sites, Datenbanken, Daemons, geplante Aufgaben und SSL-Zertifikate, dazu Datenquellen für den lesenden Zugriff. Die Organisationsebene gehört dazu, also Teams, Rollen, Rezepte, Storage-Provider und Server-Credentials.

## scope

Ausgenommen sind reine Aktionen wie das Neustarten eines Servers oder das Anstoßen eines Deployments: Sie beschreiben keinen Zustand, den ein Plan abgleichen könnte.

## install

```hcl
terraform {
  required_providers {
    laravelforge = {
      source  = "kirchdev/laravelforge"
      version = "~> 0.2"
    }
  }
}

provider "laravelforge" {
  token = var.forge_token # oder FORGE_TOKEN
}
```
