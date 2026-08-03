# Lightweight, git-native desktop client

A lightweight, git-native desktop Git client — the full branch graph, diffs, and everyday git, with first-class WSL support.

## why

Most git GUIs reimplement git: they ship their own implementation and diverge exactly where your config, hooks or credentials come in. The others bundle a complete Chromium and want several hundred megabytes of memory to show you a history.

glimpse shells out to your real git binary and parses its output. Config, hooks and credentials apply unchanged, signing works as configured, and the client stores no secrets of its own. The interface runs in the OS-native WebView rather than a bundled browser.

## quickstart

```bash
sudo apt install ./glimpse_*_amd64.deb
```

Builds for Windows, Linux and macOS ship as releases; from there the application updates itself.

## features

- **Small and quick** — the application uses the OS-native WebView instead of bringing its own browser, which keeps both the download and the memory it needs small.
- **Git-native** — nothing is written behind git's back; GPG and SSH signing work when configured, and LFS-tracked files are detected.
- **First-class WSL** — a repository under \\wsl$ is driven through that distro's git automatically, one under a Windows path through Windows git. No setup.
- **Graph and history** — the full multi-branch graph, search by message or by content, per-commit signature verification, and statistics on contributors and activity.
- **Diffs in every shape** — side-by-side, unified or whole-file, with syntax highlighting, word-level diff, collapsible unchanged regions, image diffs, blame and file history.
- **Stage down to the line** — by file, hunk or single line, plus amend and a three-way editor that resolves conflicts region by region.
- **Changelists** — group pending changes into named sets and commit one at a time; membership lives as a readable JSON file in the repository and is reachable from a bundled CLI, so scripts and agents can drive it too.
- **Advanced git** — rebase interactively or onto a ref, guided bisect, reflog recovery with undo, export and apply patches, plus worktrees, submodules and sparse-checkout.
