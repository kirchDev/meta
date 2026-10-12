# OpenTofu-/Terraform-Provider für TCPShield

Den DDoS-Schutz von TCPShield als Code verwalten: Netzwerke, Domains, Backend-Sets, Firewalls sowie Bedrock- und Sentry-Tunnel, abgeglichen durch OpenTofu.

## why

Welche Domain auf welches Backend zeigt und welche Adressen, ASNs oder Länder gesperrt sind, wird bei TCPShield im Panel eingestellt. Wer mehrere Netzwerke betreibt, richtet dieselbe Struktur dort für jedes von Hand ein.

Als Code ist ein Netzwerk mit Backends, Domains und Firewall eine Definition, und der Plan zeigt vor jeder Änderung, was sie bewirkt.

## quickstart

```hcl
resource "tcpshield_domain" "play" {
  network_id     = tcpshield_network.main.id
  name           = "play.example.com"
  backend_set_id = tcpshield_backend_set.lobby.id
}
```

Eine Domain, die auf ein Backend-Set zeigt, mit Verweisen statt kopierter IDs aus dem Panel.

## features

- **Gegen die echte API geprüft** — die offizielle Spezifikation ist bei den Datenformen ungenau; der Provider folgt dem tatsächlichen Verhalten, etwa PATCH-Aufrufen, die wie PUT wirken, oder still ignorierten Nullwerten, und fängt solche Fallen schon beim Plan ab.
- **Firewall auf drei Ebenen** — Regeln nach CIDR, ASN und Land, jeweils als eigene Ressource.
- **Alles importierbar** — über die Netzwerk- oder Tunnel-ID und die ID des Objekts lässt sich ein bestehendes Setup übernehmen.
- **Nur echte Änderungen** — Einstellungen, die in der Konfiguration fehlen, behalten ihren aktuellen Wert, statt bei jedem Plan als Abweichung aufzutauchen.

## scope

Zugangsdaten verwaltet der Provider nicht: E-Mail, Passwort und API-Key des Kontos gehören nicht in eine State-Datei, und den Key neu zu erzeugen würde dem Provider mitten im Apply die eigene Berechtigung entziehen.

## install

```hcl
terraform {
  required_providers {
    tcpshield = {
      source  = "kirchdev/tcpshield"
      version = "~> 0.1"
    }
  }
}

provider "tcpshield" {
  api_key = var.tcpshield_api_key # oder TCPSHIELD_API_KEY
}
```
