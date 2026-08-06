# CLI for a tidy local repo layout

Manages local clones in a fixed layout of server, organisation and repository name and builds search, mass sync and safe cleanup on top of it.

## why

Clones land wherever you happened to be when you cloned them: in the projects folder, next to it, or under a different name. As the number grows it stops being clear which repositories are local, which hold unpushed work, and which could safely go.

forgemap fixes a stable path scheme, then sticks to it. Because the path is predictable, search and switching work again, and bulk operations become possible: one sync covers every clone, and nothing is deleted unless it is provably backed up.

## quickstart

```bash
$ forgemap clone kirchDev/laravel-pbac
✔ Cloned kirchDev/laravel-pbac → ~/projects/comGithub/kirchDev/laravel-pbac
```

The destination comes from the configuration, not from the directory the command runs in.

## features

- **Predictable layout** — every clone lands under the same path scheme; GitLab subgroups are kept as directory levels.
- **Flexible slug syntax** — owner and name, full HTTPS URLs or SSH; even a pasted merge-request URL still resolves to the right repository.
- **List and fuzzy search** — list every local repository or filter by owner and name; switching, printing a path and opening in the file manager take the same terms.
- **Forge-aware** — GitHub through gh, GitLab through glab including subgroups; any other host is configured as a plain git type and served through git clone.
- **Mass sync and status** — refresh every clone in parallel and show branch, pending changes and ahead/behind counts per repository, optionally narrowed to given owners or forges.
- **Adopt existing trees** — a folder already laid out this way is read in, reconciled against its git remotes, and turned into a configuration.
- **Safe cleanup** — long-idle clones are deleted only when they are clean, fully pushed, free of stashed work and still present on their remote; by default, nothing that exists only locally is lost.
- **Shell integration** — real directory switching plus tab completion, wired up in one step.

## scope

forgemap manages the local side: where clones live and when they can go. Toward the server it only clones and reads; nothing on the remote is ever changed, and even deleting a repository only removes the local copy. Nor does it replace gh and glab: forgemap shells out to them for cloning, and has no commands of its own for issues, merge requests or releases.

## install

```pnpm
pnpm add -g forgemap
```

```npm
npm install -g forgemap
```

Needs Node 24 or newer and git on the PATH; gh and glab are only required when a forge of that type is configured.
