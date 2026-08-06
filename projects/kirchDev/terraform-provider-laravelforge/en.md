# OpenTofu / Terraform provider for Laravel Forge

Manage your entire Laravel Forge estate as code: servers, sites, databases, daemons and SSL. Whatever someone changed directly in Forge shows up in the next plan.

## why

Forge is driven through its UI, and what you build there exists only there. A staging environment that matches production has to be rebuilt by hand, and starts drifting from the first change onwards.

Described as code, a second environment is the same definition with different variables, and because OpenTofu diffs before it applies, every plan surfaces drift from the actual state.

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

A site as a resource, on the same plan-and-apply cycle as the rest of your infrastructure.

## features

Nearly every entity Forge lets you manage has a resource: servers, sites, databases, daemons, scheduled jobs and SSL certificates, with data sources covering read access on top. The organisation level is part of that, meaning teams, roles, recipes, storage providers and server credentials.

## scope

Pure actions like rebooting a server or triggering a deployment are left out: they carry no state for a plan to reconcile.

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
  token = var.forge_token # or set FORGE_TOKEN
}
```
