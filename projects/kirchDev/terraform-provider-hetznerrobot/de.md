# OpenTofu-/Terraform-Provider für Hetzner Robot

Dedizierte Server bei Hetzner als Code verwalten: IPs, Failover, rDNS, Firewalls, vSwitches, Storage Boxes und Bestellungen, abgeglichen durch OpenTofu.

## why

Für die Hetzner Cloud gibt es den offiziellen Provider hcloud, die dedizierten Server in Robot deckt er nicht ab. Deren rDNS-Einträge, Firewall-Regeln und vSwitches werden deshalb in der Robot-Oberfläche gepflegt und existieren nur dort.

Als Code steht die Konfiguration eines Servers an einer Stelle, und jeder Plan zeigt, was sich in Robot seitdem verändert hat.

## quickstart

```hcl
resource "hetznerrobot_failover" "vip" {
  ip               = "88.99.1.10"
  active_server_ip = data.hetznerrobot_server.standby.server_ip
}
```

Eine Failover-IP auf den Standby-Server umlegen, als Änderung im Code statt als Klick in Robot.

## features

- **Vorsichtig mit Geld und Maschinen** — eine Bestellung wird gespeichert, sobald Robot sie annimmt, und bei einem Timeout nie erneut ausgelöst; das Entfernen eines Servers oder einer Storage Box vergisst ihn nur, gekündigt wird über eine eigene Ressource.
- **Einmalige Aktionen als Ressourcen** — Resets und Wake on LAN laufen beim Anlegen und erneut, wenn sich ihre Trigger ändern; eine Boot-Konfiguration übersteht den Neustart, der sie verbraucht, ohne dass der nächste Plan sie wieder aktivieren will.
- **Import über den natürlichen Schlüssel** — Servernummer, IP, Fingerprint oder Transaktions-ID, wie sie in Robot stehen.
- **Hält sich an Robots Grenzen** — fehlgeschlagene Logins werden nie wiederholt, weil Robot die IP nach drei Fehlversuchen für zehn Minuten sperrt, und Schreibzugriffe auf Storage Boxes halten den geforderten Abstand ein.

## scope

Der Provider deckt den Robot-Webservice ab und nicht die Hetzner Cloud; die bleibt bei hcloud. Storage Boxes verwaltet er nur, soweit Robot sie führt, also die inklusive BX10. Ein Snapshot-Rollback einer ganzen Box ist bewusst keine Ressource, weil er als Nebenwirkung eines Plans zu folgenreich wäre.

## install

```hcl
terraform {
  required_providers {
    hetznerrobot = {
      source  = "kirchdev/hetznerrobot"
      version = "~> 0.1"
    }
  }
}

provider "hetznerrobot" {} # HETZNER_ROBOT_USER / HETZNER_ROBOT_PASSWORD
```
