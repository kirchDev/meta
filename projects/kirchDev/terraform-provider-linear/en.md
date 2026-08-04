# OpenTofu / Terraform provider for Linear

Manage your Linear workspace as code — teams, labels, workflow states, views, git automation and workspace settings, reconciled by OpenTofu.

## why

A Linear workspace accumulates configuration: teams with their own workflow states, labels at several levels, shared views, git automation per event. It grows over months of clicking, and setting up a second team consistently becomes busywork.

As HCL the workspace is auditable and repeatable. What makes up a team sits in one place, changes go through review, and a new team is a module rather than a checklist.

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

A shared view as code — rather than clicked together in the UI and documented nowhere.

## features

- **Linear as code** — teams, labels, workflow states, views, git automation, webhooks and workspace settings in HCL.
- **Views included** — with team, project and initiative scope; filters are expressed as JSON and compared semantically, so a server-normalised filter does not read as drift.
- **Full workspace settings** — every field the API accepts, not just a convenient subset of them.
- **Git automation per event** — draft, start, review, mergeable and merge each as their own resource, so all five round-trip on import.
- **Releases covered** — release pipelines and their stages are resources too.

## scope

Scope is deliberately workspace configuration. Issues, projects, initiatives, documents and comments are content — they belong in Linear's UI and its API, not in a state file.

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
