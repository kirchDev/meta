# OpenTofu-/Terraform-Provider für Discord

Discord-Guild-Infrastruktur als Code verwalten: Rollen, Kanäle, Mitglieder, Webhooks, Events und Moderation in HCL. Berechtigungen stehen als Namen im Code, nicht als Bitfelder.

## why

Wer in einer Discord-Guild was darf, lässt sich in der Oberfläche nur Rolle für Rolle und Kanal für Kanal nachsehen. Discord speichert Berechtigungen als Bitfelder, also sagt auch die API es nicht im Klartext.

In HCL ist die gesamte Berechtigungsvergabe als Ganzes lesbar. Der Provider übersetzt benannte Berechtigungen in die Bitfelder.

## quickstart

```hcl
resource "discord_role" "moderators" {
  server_id   = "123456789012345678"
  name        = "Moderators"
  permissions = data.discord_permission.mod.allow_bits
  hoist       = true
}
```

Die Berechtigungen kommen benannt aus einer Datenquelle, statt als handgerechnetes Bitfeld im Code zu stehen.

## features

Abgedeckt sind neben Rollen, Kanälen, Berechtigungs-Überschreibungen, Mitgliedern, Webhooks und Einladungen auch Auto-Moderation, geplante Events, Onboarding, Soundboard-Sounds und Application-Commands. Bei einer Drosselung wartet der Client so lange, wie Discord es verlangt, und wiederholt vorübergehende Fehler von selbst.

## scope

Der Provider verwaltet Guild-Infrastruktur, keinen Chat. Nachrichteninhalte deckt er nur ab, wo sie fest und deklarativ sind: angepinnte Forum-Posts und einzelne Embed-Nachrichten, kein laufender Nachrichtenstrom. Einen Bot bringt er nicht mit, sondern arbeitet mit dem Token eines bestehenden Bots, der Mitglied jeder verwalteten Guild sein muss.

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
  token = var.discord_token # oder DISCORD_TOKEN
}
```
