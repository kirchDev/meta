# CLI for a tidy local repo layout

CLI that manages a local repo layout grouped by git server, organization and repository name.

## why

Clones pile up wherever you happened to be: one in the projects folder, one on the desktop, one under a name only that day's context explains. After a few dozen repositories nobody knows which ones are local, which hold unpushed work, and which could be deleted.

forgemap fixes a layout — server, organisation, repository name — and sticks to it. Because the path is predictable, search, switching and bulk operations work again: refresh every clone, see status everywhere, clean up without risk.

## quickstart

```bash
$ forgemap clone kirchDev/laravel-pbac
✔ Cloned kirchDev/laravel-pbac → ~/projects/comGithub/kirchDev/laravel-pbac
```

The destination comes from the configuration, not from the directory the command runs in.

## features

- **Predictable layout** — every clone lands under server, namespace and repository name; GitLab subgroups nest as deeply as they do upstream.
- **Flexible slug syntax** — owner and name, full HTTPS URLs or SSH; even a pasted merge-request URL still resolves to the right repository.
- **List and fuzzy search** — list every local repository or filter by owner and name; switching, printing a path and opening in an editor take the same terms.
- **Forge-aware** — GitHub through gh, GitLab through glab including subgroups, anything else through plain git clone with no extra dependency at all.
- **Mass sync and status** — refresh every clone in parallel and show branch, pending changes and distance from the remote per repository, optionally narrowed to given owners or forges.
- **Adopt existing trees** — a folder already laid out this way is read in, reconciled against its git remotes, and turned into a configuration.
- **Safe cleanup** — long-idle clones are deleted only when they are clean, fully pushed, free of stashed work and still present on their remote; nothing unbacked-up is lost.
- **Shell integration** — real directory switching plus tab completion, wired up in one step.

## install

```bash
npm install -g forgemap
```
