# Coverage on the pull request, from the reports your CI already writes

Reports total, patch and delta coverage as one sticky comment plus a check run, read from the coverage files the run produces anyway.

## why

Coverage comments already exist as ready-made actions, several times over. So the first task was not to build another one but to run the existing ones against a real repository, with Vitest and Pest side by side and a real pull request. Four gaps came back, and they are the whole scope: each reads one format family, none merges two suites into a single number, none fetches the target branch's baseline itself, and none computes patch coverage. What the existing ones offer as changed files filters by file and then still lists every uncovered line inside it.

No outside service is needed for any of it. The numbers are produced inside the workflow and never leave it.

## quickstart

```yaml
- uses: kirchDev/coverage-report@v0.3.0
  with:
    reports: |
      coverage/lcov.info
      coverage.xml
    min-patch: '80'
```

Two suites, one number, one comment on the pull request.

## features

- **Four formats in one run** — lcov, Cobertura, Clover and Istanbul, detected by content rather than by file name, because coverage.xml is Clover in a Laravel repository and Cobertura in a .NET one.
- **One number for a monorepo** — the JavaScript report and the PHP report merge, and a line both suites hit counts once.
- **Patch coverage that means it** — the diff is mapped onto line hits, so the open lines are the ones this change touched, not the other four hundred in the same file.
- **The baseline stays in the repository** — the integration branch's coverage lives on an orphan branch, so the delta needs neither a service nor an artifact with an expiry date.
- **A comment and a check run** — the comment is found again by a marker and edited rather than piled up, plus a check run for branch protection to gate on.
- **Thresholds that bite or stay quiet** — with a floor the run fails; without one the check concludes neutral rather than showing a green tick nobody earned.

## scope

Nothing here measures. The coverage files still come from your own test suite, and without such a report the action has nothing to read. It replaces Codecov where comment, delta and thresholds are concerned, and nowhere else: there is no history across months, no view spanning several repositories, and no interface outside the pull request.

## install

```yaml
- uses: kirchDev/coverage-report@v0.3.0
```

The same numbers locally, as a CLI without the GitHub half. That is what makes a disagreement between a check on your own machine and the comment on the pull request debuggable at all.

```pnpm
pnpm add -D @kirchdev/coverage-report
```

```npm
npm install -D @kirchdev/coverage-report
```
