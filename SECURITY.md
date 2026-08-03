# Security Policy

## Scope

`meta` is a **data repository** — curated project entries, a JSON Schema, and the workflow that assembles them into the `projects.json` served to [kirch.dev](https://kirch.dev). It is not a published package.

The supported "version" is always the **tip of `main`**. Nothing here is consumed by version, so there are no historical branches to back-port fixes to.

## Reporting a Vulnerability

**Please do not file a public GitHub issue for security problems.**

In the context of this repository, a "vulnerability" typically means:

- An insecure default in a shipped workflow (e.g. overly broad `permissions`).
- A misconfigured Action that could leak secrets, or a change that would make the sync read private repository data.
- A dependency in `package.json` that introduces a known CVE.

Use one of the following private channels:

1. **GitHub Private Vulnerability Reporting** (preferred): open a private advisory at <https://github.com/kirchDev/meta/security/advisories/new>.
2. **Email**: [titus.kirch@kirch.dev](mailto:titus.kirch@kirch.dev). PGP available on request.

Please include:

- A description of the vulnerability and its impact on downstream repositories.
- Steps to reproduce.
- Any suggested fix, if you have one.

### What to expect

| Stage                        | Target timeline                                   |
| :--------------------------- | :------------------------------------------------ |
| Acknowledgement of report    | within **3 business days**                        |
| Initial assessment & triage  | within **7 business days**                        |
| Patch released (if accepted) | depends on severity — critical issues prioritised |
| Public disclosure & advisory | coordinated with reporter after the patch ships   |

## Credit

Reporters who follow this process responsibly are credited in the [CHANGELOG](CHANGELOG.md) and the corresponding GitHub Security Advisory, unless they prefer to remain anonymous.

---

Maintained by [Titus Kirch](https://github.com/TitusKirch/) / [IT-Dienstleistungen Titus Kirch](https://kirch.dev).
