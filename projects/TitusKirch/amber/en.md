# Backup tool for Git and GitHub

Aims to back up Git repositories and their full forge metadata — issues, pull requests, releases, labels — not just the git history.

## why

A git clone saves the code. What vanishes when an account is suspended, an organisation deleted or a repository removed by accident is everything else: the discussion in the issues, the reviews on the pull requests, the releases and their notes, the labels and milestones the work hung on.

That is the part amber is meant to capture. The plan is a full git mirror with every branch and tag, the metadata as JSON beside it, a manifest with integrity hashes, and incremental runs that fetch only what changed on the second pass. Storage should stay readable as ordinary folders, so restoring is simply copying.

## scope

So far only the project scaffolding exists: linting, formatting, commit hooks and CI. Implementation has not started, so there is neither a command nor an installable package — the section above describes the intent, not today's feature set.
