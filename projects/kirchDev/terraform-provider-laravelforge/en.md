# OpenTofu / Terraform provider for Laravel Forge

Manage your entire Laravel Forge estate as code — servers, sites, databases, daemons, SSL and more, reconciled by OpenTofu.

## why

A Forge estate grows by clicking: a server here, a site there, a daemon someone set up a year ago. After a while nobody can say why a site is configured the way it is, and standing up a second estate for staging means patiently rebuilding it by hand.

As HCL the answer sits in a repository. Changes go through review, a second estate is a copy with different variables, and anything changed by hand at the destination shows up on the next reconcile.

## quickstart

```hcl
resource "laravelforge_site" "app" {
  organization = "your-org"
  server_id    = data.laravelforge_server.web.id
  type         = "php"
  name         = "app.example.com"
  php_version  = "php82"
}
```

A site as a resource — on the same plan-and-apply cycle as the rest of your infrastructure.

## features

- **Forge as code** — servers, sites, databases, daemons, scheduled jobs, SSL certificates and more in HCL.
- **Full API coverage** — around 57 resources and 83 data sources across essentially every entity Forge lets you manage.
- **Simple auth** — a single Forge token, by attribute or environment variable.

## install

```hcl
terraform {
  required_providers {
    laravelforge = {
      source  = "kirchdev/laravelforge"
      version = "~> 0.1"
    }
  }
}

provider "laravelforge" {
  token = var.forge_token # or set FORGE_TOKEN
}
```
