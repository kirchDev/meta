# Backup tool for Git and GitHub

Aims to back up Git repositories along with their forge metadata: issues, pull requests, releases and labels, not just the git history.

## why

A git clone saves the code. Everything else disappears the moment an account is suspended or an organisation deleted: the discussion in the issues, the comments on the pull requests, the releases and their notes, the labels and milestones.

That is the part amber is meant to capture, alongside the git mirror itself.

## scope

So far only the project scaffolding exists: linting, formatting, commit hooks, CI and release automation. Implementation has not started, so there is neither a command nor an installable package. The section above describes the intent, not today's feature set.
