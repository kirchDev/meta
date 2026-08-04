# OpenTofu / Terraform provider for Discord

Manage your Discord guild infrastructure as code — roles, channels, permissions, members, webhooks, events and moderation, reconciled by OpenTofu.

## why

A guild that grew organically is hard to audit. Permissions get handed out in passing, a role gets one more "just for now", and six months later nobody can say who may do what, or since when. Discord expressing permissions as bitfields does not help.

As HCL the answer sits in a repository, changes go through review, and a second guild — for testing, or another community — is a copy with different variables instead of a week of clicking.

## quickstart

```hcl
resource "discord_role" "moderators" {
  server_id   = "123456789012345678"
  name        = "Moderators"
  permissions = data.discord_permission.mod.allow_bits
  hoist       = true
}
```

Permissions come from a data source of named rights, instead of a hand-computed bitfield sitting in the code.

## features

- **Discord as code** — roles, channels, permission overwrites, members, webhooks, invites, events and moderation settings in HCL.
- **Broad API coverage** — around 24 resources and 9 data sources across guild management.
- **Ergonomic permissions** — a data source turns named rights into the bitfields Discord expects; nobody adds numbers by hand.
- **Rate-limit aware** — the client honours the wait Discord asks for after a throttle and retries transient errors by itself.

## install

```hcl
terraform {
  required_providers {
    discord = {
      source  = "kirchdev/discord"
      version = "~> 0.1"
    }
  }
}

provider "discord" {
  token = var.discord_token # or set DISCORD_TOKEN
}
```
