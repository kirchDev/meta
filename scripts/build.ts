import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  type Download,
  LOCALES,
  type Locale,
  ROOT,
  loadProjects
} from './projects.ts';

/**
 * Builds `projects.json` — the one file the app fetches.
 *
 * The split it implements is the reason this repository exists: facts come from
 * the GitHub API on a schedule, editorial content is committed here by hand,
 * and presentation — labels, icons, colours — never appears at all. Category
 * and technology travel as keys; `kirchDev/app` owns what they are called and
 * what they look like, in its locale files.
 *
 * The app needs no token for any of this, and no knowledge of the API.
 */
const token = process.env.GITHUB_TOKEN;

interface RepoFacts {
  license: string;
  stars: number;
  updatedAt: string;
  archived: boolean;
}

/** Only public repositories are ever read — see `github` in the schema. */
const fetchRepo = async (owner: string, slug: string): Promise<RepoFacts> => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${slug}`,
    {
      headers: {
        accept: 'application/vnd.github+json',
        'user-agent': 'kirchDev-meta-sync',
        ...(token ? { authorization: `Bearer ${token}` } : {})
      }
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub API ${response.status} for ${owner}/${slug}: ${await response.text()}`
    );
  }

  const repo = (await response.json()) as {
    private: boolean;
    archived: boolean;
    pushed_at: string;
    stargazers_count: number;
    license: { spdx_id: string } | null;
  };

  if (repo.private) {
    throw new Error(
      `${owner}/${slug} is private, but its entry does not set "github": false`
    );
  }

  return {
    license: repo.license?.spdx_id ?? 'NOASSERTION',
    stars: repo.stargazers_count,
    updatedAt: repo.pushed_at.slice(0, 10),
    archived: repo.archived
  };
};

/**
 * The installers of the latest release, for a project shipped as a download.
 *
 * Fetched rather than committed because the asset names carry the version, so
 * a URL written into an entry would point at an old build the day after the
 * next release — and GitHub's `/releases/latest/download/<name>` shortcut only
 * works when the name is constant, which it is not here.
 */
const PLATFORMS: [RegExp, Download['platform'], string][] = [
  [/\.exe$/i, 'windows', 'exe'],
  [/\.msi$/i, 'windows', 'msi'],
  [/\.deb$/i, 'linux', 'deb'],
  [/\.rpm$/i, 'linux', 'rpm'],
  [/\.appimage$/i, 'linux', 'appimage'],
  [/\.dmg$/i, 'macos', 'dmg'],
  [/\.app\.tar\.gz$/i, 'macos', 'app']
];

const fetchDownloads = async (
  owner: string,
  slug: string
): Promise<{ version: string; downloads: Download[] }> => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${slug}/releases/latest`,
    {
      headers: {
        accept: 'application/vnd.github+json',
        'user-agent': 'kirchDev-meta-sync',
        ...(token ? { authorization: `Bearer ${token}` } : {})
      }
    }
  );

  if (!response.ok) {
    throw new Error(
      `${owner}/${slug} sets "downloads": true but has no published release (GitHub API ${response.status})`
    );
  }

  const release = (await response.json()) as {
    tag_name: string;
    assets: { name: string; size: number; browser_download_url: string }[];
  };

  const downloads: Download[] = [];

  for (const asset of release.assets) {
    // Signatures and the updater manifest sit beside the installers.
    if (/\.sig$/i.test(asset.name) || asset.name === 'latest.json') continue;

    const match = PLATFORMS.find(([pattern]) => pattern.test(asset.name));
    if (!match) continue;

    downloads.push({
      platform: match[1],
      format: match[2],
      url: asset.browser_download_url,
      size: asset.size
    });
  }

  if (downloads.length === 0) {
    throw new Error(
      `${owner}/${slug} release ${release.tag_name} has no recognised installer among: ${release.assets.map((a) => a.name).join(', ')}`
    );
  }

  return { version: release.tag_name, downloads };
};

const entries = loadProjects();
const projects: Record<string, unknown>[] = [];
const failures: string[] = [];

for (const { owner, slug, project, i18n } of entries) {
  const usesGithub = project.github !== false;

  // `archived` is always present, so the app never has to treat "absent" and
  // "not archived" as the same thing — an entry that opts out of GitHub simply
  // has no repository that could be archived.
  let facts: Partial<RepoFacts> = { license: project.license, archived: false };

  if (usesGithub) {
    try {
      facts = await fetchRepo(owner, slug);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
      continue;
    }
  }

  // `archived` and `activity` are the same axis, so the API's answer and a
  // hand-written one can contradict each other. `maturity` is the other axis
  // and is left alone: unfinished-and-archived is a real state, not a mistake.
  if (facts.archived && project.activity === 'paused') {
    failures.push(
      `${owner}/${slug} is archived on GitHub but its entry says "activity": "paused" — archived means the work is not resuming`
    );
    continue;
  }

  let release: { version: string; downloads: Download[] } | null = null;

  if (project.downloads) {
    try {
      release = await fetchDownloads(owner, slug);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
      continue;
    }
  }

  projects.push({
    slug,
    owner,
    kind: project.kind,
    category: project.category,
    technologies: project.technologies,
    ...(project.maturity && { maturity: project.maturity }),
    ...(project.activity && { activity: project.activity }),
    ...facts,
    ...(usesGithub && { repository: `https://github.com/${owner}/${slug}` }),
    ...(release && { version: release.version, downloads: release.downloads }),
    links: project.links ?? [],
    i18n: Object.fromEntries(
      LOCALES.map((locale: Locale) => [
        locale,
        {
          tagline: i18n[locale].tagline,
          description: i18n[locale].description,
          summary: i18n[locale].summary,
          sections: i18n[locale].sections
        }
      ])
    )
  });
}

/**
 * A partial file is worse than a stale one: the app's fallback chain can serve
 * the last good copy, but it cannot tell that a project went missing because
 * one API call failed.
 */
if (failures.length > 0) {
  for (const failure of failures) console.error(`✖ ${failure}`);
  console.error(
    `\n${failures.length} of ${entries.length} entries failed — not writing.`
  );
  process.exit(1);
}

projects.sort((a, b) => (a.slug as string).localeCompare(b.slug as string));

const output = {
  generatedAt: new Date().toISOString().slice(0, 10),
  locales: LOCALES,
  projects
};

writeFileSync(
  join(ROOT, 'projects.json'),
  `${JSON.stringify(output, null, 2)}\n`
);
console.log(`✔ projects.json written — ${projects.length} entries.`);
