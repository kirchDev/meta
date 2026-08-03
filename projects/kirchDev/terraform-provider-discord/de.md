# OpenTofu-/Terraform-Provider für Discord

Discord-Guild-Infrastruktur als Code verwalten — Rollen, Kanäle, Berechtigungen, Mitglieder, Webhooks, Events und Moderation, abgeglichen durch OpenTofu.

## why

Eine gewachsene Discord-Guild ist schwer zu prüfen. Rechte werden im Vorbeigehen vergeben, eine Rolle bekommt „nur kurz" eine Berechtigung mehr, und ein halbes Jahr später kann niemand sagen, wer was darf und seit wann. Discords Berechtigungen als Bitfelder machen das nicht besser.

Als HCL steht die Antwort im Repository, Änderungen laufen durch ein Review, und eine zweite Guild — für Tests oder eine weitere Community — ist eine Kopie mit anderen Variablen statt einer Woche Klickarbeit.

## quickstart

```hcl
resource "discord_role" "moderators" {
  server_id   = "123456789012345678"
  name        = "Moderators"
  permissions = data.discord_permission.mod.allow_bits
  hoist       = true
}
```

Die Berechtigungen kommen aus einer Datenquelle mit benannten Rechten, statt als handgerechnetes Bitfeld im Code zu stehen.

## features

- **Discord als Code** — Rollen, Kanäle, Rechte-Überschreibungen, Mitglieder, Webhooks, Einladungen, Events und Moderationseinstellungen in HCL.
- **Breite API-Abdeckung** — rund 24 Ressourcen und 9 Datenquellen über die Verwaltung einer Guild.
- **Handhabbare Berechtigungen** — eine Datenquelle übersetzt benannte Rechte in die Bitfelder, die Discord erwartet; niemand rechnet Zahlen von Hand zusammen.
- **Rate-Limits berücksichtigt** — der Client beachtet die von Discord genannte Wartezeit nach einer Drosselung und wiederholt vorübergehende Fehler von selbst.
