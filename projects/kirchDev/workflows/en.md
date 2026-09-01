# Reusable GitHub Actions workflows for a whole estate

A workflow's body lives centrally, once; every other repository carries nothing but a call and its trigger. A fix is written once, and everyone picks it up on their next bump.

## why

The canonical workflows used to live in a template and were copied into every new repository, where they began to drift immediately. Measured across the 27 repositories of both owners: the CI workflow existed in 25 repositories as 24 variants, the one landing the queue in 26 repositories as 8 variants between 189 and 397 lines, the code analysis in 18 as 15.

The outlier proves the point: one workflow sat byte-identical in 20 repositories, 760 lines for a single thing. A fix meant twenty commits, and nothing told you which repository you had missed. A call does not have that problem, because the body sits in one place only.

## quickstart

```yaml
jobs:
  promotion-pr:
    uses: kirchDev/workflows/.github/workflows/_promotion-pr.yml@9f3c1a2
```

The call in the repository carries the trigger and nothing else. Eight lines, with nothing left to drift.

## features

- **Body and call kept apart** — the trigger stays in the repository it fires in, while the logic lives centrally and is maintained there once.
- **The topology is the configuration** — the promotion pull request finds its own target by checking whether a stage branch exists. No switch, no second variant.
- **Pinned to a commit** — callers pin a SHA, so a push into the bodies reaches nobody before a bump has been reviewed and merged.
- **Named secrets** — a call hands over exactly what its body needs instead of inheriting everything wholesale.
- **Checked against its own diet** — this repository carries the same call as everyone else and invokes its own bodies by local path, so a broken body fails here first.

## scope

Not a general collection of actions. The bodies encode this estate's branch topology, the per-owner layout of its secrets and its in-house coverage action; adopting them means adopting those conventions too.

What belongs in the calling repository stays there as well: the deploy jobs, and the manual trigger that lands a queue. A reusable workflow cannot be dispatched, which is why that particular human gate provably sits in the repository it protects.
