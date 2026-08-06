# OpenTofu / Terraform provider for Discord

Manage your Discord guild infrastructure as code: roles, channels, members, webhooks, events and moderation in HCL. Permissions are written by name, not as bitfields.

## why

Working out who is allowed to do what in a Discord guild means clicking through the UI role by role, channel by channel. Discord stores permissions as bitfields, so the API does not spell it out either.

In HCL the entire grant reads as a single document. The provider translates named permissions into those bitfields.

## quickstart

```hcl
resource "discord_role" "moderators" {
  server_id   = "123456789012345678"
  name        = "Moderators"
  permissions = data.discord_permission.mod.allow_bits
  hoist       = true
}
```

The permissions arrive by name from a data source instead of sitting in the code as a hand-computed bitfield.

## features

Beyond roles, channels, permission overwrites, members, webhooks and invites it covers auto-moderation, scheduled events, onboarding, soundboard sounds and application commands. On a throttle the client waits as long as Discord asks and retries transient errors by itself.

## scope

The provider manages guild infrastructure, not chat. Message content is covered only where it is fixed and declarative: pinned forum posts and standalone embed messages, not a live message stream. It ships no bot of its own, but works with the token of an existing bot, which has to be a member of every guild it manages.

## install

```hcl
terraform {
  required_providers {
    discord = {
      source  = "kirchdev/discord"
      version = "~> 0.6"
    }
  }
}

provider "discord" {
  token = var.discord_token # or set DISCORD_TOKEN
}
```
