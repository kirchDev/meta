# Fills the gaps in the Linear-GitHub sync

A Cloudflare Worker that carries across what the built-in sync between Linear and GitHub does not: from priority to the state of agent work.

## why

The native sync mirrors issues, labels and states. A value that is a field on one side and a label on the other has no counterpart to land in: the priority maintained in Linear does not surface on GitHub, and when several repositories sync into the same Linear team, nothing shows which repository an issue came from.

The Worker carries that across. It listens to Linear's webhooks, reconciles on every change, and writes what the other side is missing: fields become labels, labels become workflow states, the source repository becomes a label on the Linear issue.

## features

- **Priority as a label, on both sides** — the priority set in Linear is written as a priority label onto the GitHub issue and the Linear issue; a new GitHub issue that already carries one seeds the Linear field the other way round.
- **Source repository as a Linear label** — synced issues get a repo label with owner and name, derived from the native sync's attachment.
- **A bridge to the agent workflow** — ai labels on GitHub are mirrored into Linear workflow states and onto the linked pull requests; finished issues have their ai labels cleaned up on both sides.
- **Webhook plus backstop** — a Linear webhook reconciles changes immediately, a run every five minutes catches dropped events; there is no server to run.

## scope

This does not replace the native sync, it depends on it. Mirroring issues remains the job of Linear's own GitHub integration, and the Worker never links the two sides itself; it reads the link the sync leaves behind and carries across what would otherwise be lost.
