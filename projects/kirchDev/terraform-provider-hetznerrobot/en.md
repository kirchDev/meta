# OpenTofu / Terraform provider for Hetzner Robot

Manage your Hetzner dedicated servers as code: IPs, failover, rDNS, firewalls, vSwitches, Storage Boxes and orders, reconciled by OpenTofu.

## why

The Hetzner Cloud has the official hcloud provider, but it does not cover the dedicated servers in Robot. Their rDNS entries, firewall rules and vSwitches are therefore maintained in the Robot UI and exist only there.

As code a server's configuration sits in one place, and every plan shows what has changed in Robot since.

## quickstart

```hcl
resource "hetznerrobot_failover" "vip" {
  ip               = "88.99.1.10"
  active_server_ip = data.hetznerrobot_server.standby.server_ip
}
```

Routing a failover IP to the standby server, as a change in code instead of a click in Robot.

## features

- **Careful with money and machines** — an order is saved the moment Robot accepts it and never re-sent on a timeout; destroying a server or a Storage Box only forgets it, and cancelling is a resource of its own.
- **One-shot actions as resources** — resets and Wake on LAN run on create and again whenever their triggers change; a boot configuration survives the reboot that consumes it without the next plan wanting to re-activate it.
- **Import by natural key** — server number, IP, fingerprint or transaction id, as Robot shows them.
- **Respects Robot's limits** — failed logins are never retried, since Robot blocks the IP for ten minutes after three of them, and Storage Box writes keep the spacing Robot requires.

## scope

The provider covers the Robot webservice, not the Hetzner Cloud; that stays with hcloud. Storage Boxes are managed only as far as Robot holds them, which means the inclusive BX10. Rolling a whole box back to a snapshot is deliberately not a resource, because it would be too drastic as a side effect of a plan.

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
