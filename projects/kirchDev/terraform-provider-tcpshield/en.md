# OpenTofu / Terraform provider for TCPShield

Manage your TCPShield DDoS protection as code: networks, domains, backend sets, firewalls, and Bedrock and Sentry tunnels, reconciled by OpenTofu.

## why

Which domain points at which backend, and which addresses, ASNs or countries are blocked, is set in the TCPShield panel. Running several networks means setting up the same structure there by hand for each one.

As code a network with its backends, domains and firewall is one definition, and the plan shows what a change does before it happens.

## quickstart

```hcl
resource "tcpshield_domain" "play" {
  network_id     = tcpshield_network.main.id
  name           = "play.example.com"
  backend_set_id = tcpshield_backend_set.lobby.id
}
```

A domain pointing at a backend set, with references instead of IDs copied out of the panel.

## features

- **Verified against the live API** — the official spec is loose about shapes; the provider follows what the API actually does, such as PATCHes that behave like PUTs or zero values silently ignored, and catches those traps at plan time.
- **Firewall on three levels** — rules by CIDR, ASN and country, each a resource of its own.
- **Import everything** — an existing setup is adopted by network or tunnel id plus the object's id.
- **Only real changes** — settings left out of the configuration keep their live value instead of showing up as drift on every plan.

## scope

The provider does not manage credentials: the account's email, password and API key do not belong in a state file, and regenerating the key would pull the provider's own access out from under it in the middle of an apply.

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
  api_key = var.tcpshield_api_key # or set TCPSHIELD_API_KEY
}
```
