# OpenTofu-/Terraform-Provider für Laravel Forge

Den gesamten Laravel-Forge-Bestand als Code verwalten — Server, Sites, Datenbanken, Daemons, SSL und mehr, abgeglichen durch OpenTofu.

## why

Ein Forge-Bestand entsteht durch Klicken: ein Server hier, eine Site dort, ein Daemon, den jemand vor einem Jahr eingerichtet hat. Nach einer Weile beantwortet niemand mehr, warum eine Site so konfiguriert ist, und ein zweiter Bestand für Staging lässt sich nur durch geduldiges Nachbauen herstellen.

Als HCL steht die Antwort im Repository. Änderungen laufen durch ein Review, ein zweiter Bestand ist eine Kopie mit anderen Variablen, und was von Hand am Ziel verändert wurde, fällt beim nächsten Abgleich auf.

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

Eine Site als Ressource — mit demselben Plan- und Apply-Zyklus wie die übrige Infrastruktur.

## features

- **Forge als Code** — Server, Sites, Datenbanken, Daemons, geplante Aufgaben, SSL-Zertifikate und mehr in HCL.
- **Vollständige API-Abdeckung** — rund 57 Ressourcen und 83 Datenquellen über praktisch jede Entität, die Forge verwalten lässt.
- **Einfache Authentifizierung** — ein einziges Forge-Token, per Attribut oder Umgebungsvariable.
