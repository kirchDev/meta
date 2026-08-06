# OpenTofu / Terraform provider for Linear

Manage your Linear workspace as code: teams, labels, workflow states, views, git automation and workspace settings, reconciled by OpenTofu.

## why

A Linear team is more than its name: its own workflow states, labels at several levels, shared views and git automation per event. Setting up another team the same way means clicking all of it again in the UI.

As code a team is a module: described once, applied again with different values for the next one. And what makes up a team sits together; the UI spreads it across several settings dialogs.

## quickstart

```hcl
resource "linear_custom_view" "in_review" {
  name    = "In Review"
  team_id = linear_team.eng.id
  shared  = true

  filter_json = jsonencode({
    state = { type = { eq = "started" } }
  })
}
```

A shared view as code, versioned and reviewable like the rest of the infrastructure.

## features

- **Views included** — with team, project and initiative scope; filters are expressed as JSON and compared semantically, so a server-normalised filter does not read as drift.
- **Full workspace settings** — every field the API accepts, not just a convenient subset of them.
- **Git automation per event** — draft, start, review, mergeable and merge are one resource instance each instead of one block for all five, and each can be imported individually.
- **Webhooks as resources** — the callback Linear fires when subscribed resources change is declared like everything else, scoped to a single team or to every public team.
- **Releases covered** — release pipelines and their stages are resources too.

## scope

The provider covers workspace configuration and stops there. Issues, projects, initiatives, documents and comments are content: they belong in Linear's UI and its API, not in a state file.

## install

```hcl
terraform {
  required_providers {
    linear = {
      source  = "kirchdev/linear"
      version = "~> 0.1"
    }
  }
}

provider "linear" {
  token = var.linear_token # or set LINEAR_TOKEN
}
```
