import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const PROJECTS_DIR = join(ROOT, 'projects');

/** The languages every entry has to carry. A missing file is an error, not a fallback. */
export const LOCALES = ['de', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * The compile-time view of an entry.
 *
 * `schema/project.schema.json` stays the authority — it is what actually runs
 * against the files, in CI and in the sync. These types exist so the scripts
 * that consume a validated entry are checked; they are deliberately not
 * generated from the schema, and a value added there needs adding here too.
 */
export type ProjectKind = 'oss' | 'own';

export type CategoryKey =
  | 'cli'
  | 'desktop'
  | 'app'
  | 'laravel'
  | 'iac'
  | 'template'
  | 'ai'
  | 'other';

export type LinkType =
  | 'npm'
  | 'packagist'
  | 'opentofu'
  | 'terraform'
  | 'website'
  | 'docs'
  | 'discord';

export interface ProjectLink {
  type: LinkType;
  url: string;
}

/**
 * The last four are package-manager keys, not syntax names: consecutive fences
 * tagged with them are variants of the same shell command, and the app renders
 * such a run as one block with a manager switch. Which managers an entry lists
 * is editorial fact — only ones that actually work; order, labels and the
 * default tab are presentation and live in the app.
 */
export const LANGUAGES = [
  'bash',
  'php',
  'hcl',
  'ts',
  'json',
  'pnpm',
  'npm',
  'yarn',
  'bun'
] as const;
export type Language = (typeof LANGUAGES)[number];

/**
 * The sections a locale file may carry, in the order the page renders them.
 *
 * A `##` heading is a KEY, not a title — "Quickstart" and "Schnellstart" are
 * the same section, and what it is called belongs to the app's locale files
 * beside the category names. Same reasoning as `category` and `technologies`.
 *
 * Order comes from this list rather than from the file, so every project reads
 * the same way round and a file cannot make one project's page differ by
 * accident. Every section is optional; not every project has a command to show.
 *
 * `about` and `why` are the same slot and an entry carries at most one. `why`
 * answers a problem — the thing exists because something was wrong — and most
 * entries here are that. `about` is for the entry that solves nothing and simply
 * is: this site, a reference left online. Rendered as "Hintergrund", the latter
 * reads as a promise of a problem the text then never names.
 */
export const SECTIONS = [
  'about',
  'why',
  'quickstart',
  'features',
  'scope',
  'install'
] as const;
export type SectionKey = (typeof SECTIONS)[number];

/**
 * Lifecycle — two axes, deliberately not one field holding a set.
 *
 * How finished a project is says nothing about whether work is happening, so
 * the two combine freely: early and paused, or early and archived. A single set
 * would also admit "paused" alongside "legacy", which contradict each other;
 * two fields make that unsayable rather than merely discouraged.
 */
export type Maturity = 'wip';
export type Activity = 'paused' | 'legacy';

export interface Project {
  kind: ProjectKind;
  category: CategoryKey;
  /**
   * Left as `string[]` on purpose. The permitted values are the 43 cases of
   * `app/Enums/Technology.php` in `kirchDev/app`, copied into the schema, and
   * the schema is what validates them. Spelling them out here as well would be
   * a third copy of one list — a third place to drift.
   */
  technologies: string[];
  maturity?: Maturity;
  activity?: Activity;
  github?: boolean;
  license?: string;
  downloads?: boolean;
  links?: ProjectLink[];
}

/** One installer from the latest release, as the page offers it. */
export interface Download {
  platform: 'windows' | 'linux' | 'macos';
  /** The file kind, so a page can label two Linux downloads apart. */
  format: string;
  url: string;
  /** Bytes, for showing a size beside the button. */
  size: number;
}

/**
 * The one currency of the readable content: everything is a block, and a
 * section is a list of them.
 *
 * `list` is a definition list rather than free Markdown — an item is
 * `- **Term** — text` and arrives split in two. That keeps the promise the rest
 * of the prose makes (no Markdown renderer in the app) while still carrying the
 * one shape every project README uses for its feature list.
 *
 * A code block needs no "role": the section it sits in already says whether it
 * is an installation command or a sample.
 */
export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: { term?: string; text: string }[] }
  | { type: 'code'; language: Language; code: string };

export interface Section {
  key: SectionKey;
  blocks: Block[];
}

export interface LocaleContent {
  tagline: string;
  /** The first paragraph of the summary, and the only prose a card shows. */
  description: string;
  /** Everything before the first `##`. Its first block is the description. */
  summary: Block[];
  /** In canonical order, never file order. */
  sections: Section[];
}

export interface Entry {
  owner: string;
  slug: string;
  dir: string;
  project: Project;
  i18n: Record<Locale, LocaleContent>;
}

const directories = (path: string): string[] =>
  readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
/**
 * Reads one `de.md` / `en.md` — the whole editorial content of an entry.
 *
 * Markdown's own structure, not YAML front matter:
 *
 *     # tagline
 *
 *     summary — its first paragraph is the description a card shows
 *
 *     ## quickstart          a section KEY, never a translated title
 *
 *     ```bash
 *     …
 *     ```
 *     prose, and `- **Term** — text` lists, in any order
 *
 * Front matter was rejected deliberately: it would put German prose inside
 * YAML, where a tagline holding a colon ("CLI: das Werkzeug") silently becomes
 * a mapping or a parse error. Here a colon is just a colon.
 *
 * The prose is plain text on purpose — the app renders it without a Markdown
 * renderer, so emphasis or a link written here would reach the page as literal
 * asterisks. Exactly three things are structure rather than decoration, and so
 * are parsed: the `##` keys, the fences, and the `**Term** —` of a list item.
 */
export const parseLocale = (text: string, source: string): LocaleContent => {
  const lines = text.split('\n');

  // Annotated on the binding, not just on the arrow: TypeScript only narrows
  // past a never-returning call when the variable's own type says `never`.
  const fail: (message: string) => never = (message) => {
    throw new Error(`${source}: ${message}`);
  };

  if (!lines[0]?.startsWith('# ')) {
    fail('must open with "# <tagline>"');
  }

  const tagline = lines[0]!.slice(2).trim();
  if (!tagline) fail('the tagline after "# " is empty');

  /** Collapses the wrapping these files are allowed to have into one line. */
  const flatten = (buffer: string[]): string =>
    buffer
      .join('\n')
      .trim()
      .replaceAll(/\s*\n\s*/g, ' ');

  /** `- **Term** — text`, or a plain `- text`. */
  const listItem = (raw: string): { term?: string; text: string } => {
    const item = raw.replace(/^-\s+/, '').trim();
    const match = /^\*\*(?<term>[^*]+)\*\*\s+—\s+(?<rest>.+)$/s.exec(item);

    if (match?.groups) {
      return {
        term: match.groups.term!.trim(),
        text: match.groups.rest!.trim()
      };
    }
    if (item.includes('**')) {
      fail(
        `list item uses "**" but not the "- **Term** — text" shape: ${item}`
      );
    }
    return { text: item };
  };

  /**
   * Turns a run of lines into blocks: fences become code, runs of `- ` become
   * one list, anything else separated by blank lines becomes a paragraph.
   */
  const parseBlocks = (buffer: { line: string; at: number }[]): Block[] => {
    const blocks: Block[] = [];
    let prose: string[] = [];
    let items: string[] = [];
    let fence: { language: Language; code: string[] } | null = null;

    const flushProse = (): void => {
      const text = flatten(prose);
      if (text) blocks.push({ type: 'paragraph', text });
      prose = [];
    };

    const flushList = (): void => {
      if (items.length > 0) {
        blocks.push({ type: 'list', items: items.map(listItem) });
      }
      items = [];
    };

    for (const { line, at } of buffer) {
      const where = `line ${at}`;

      if (line.startsWith('```')) {
        if (fence) {
          blocks.push({
            type: 'code',
            language: fence.language,
            code: fence.code.join('\n').replace(/\s+$/, '')
          });
          fence = null;
          continue;
        }

        flushProse();
        flushList();

        const info = line.slice(3).trim().split(/\s+/).filter(Boolean);
        const [language] = info;

        if (!language) fail(`${where}: code fence has no language`);
        if (!LANGUAGES.includes(language as Language)) {
          fail(
            `${where}: unknown code language "${language}" (allowed: ${LANGUAGES.join(', ')})`
          );
        }
        // The role used to live here; the section it sits in now says it.
        if (info.length > 1) {
          fail(
            `${where}: a fence carries only its language, got "${info.join(' ')}"`
          );
        }

        fence = { language: language as Language, code: [] };
        continue;
      }

      if (fence) {
        fence.code.push(line);
        continue;
      }

      if (line.trim() === '') {
        flushProse();
        flushList();
        continue;
      }

      if (line.startsWith('- ')) {
        flushProse();
        items.push(line);
        continue;
      }

      // A wrapped continuation of the list item above it.
      if (items.length > 0) {
        items[items.length - 1] += ` ${line.trim()}`;
        continue;
      }

      prose.push(line);
    }

    if (fence) fail('a code fence is never closed');
    flushProse();
    flushList();

    return blocks;
  };

  const summaryLines: { line: string; at: number }[] = [];
  const found = new Map<SectionKey, { line: string; at: number }[]>();
  let current: { line: string; at: number }[] = summaryLines;
  let inFence = false;

  for (const [index, line] of lines.slice(1).entries()) {
    const at = index + 2;

    // `##` inside a fence is shell prose, not a heading.
    if (line.startsWith('```')) inFence = !inFence;

    if (!inFence && line.startsWith('##')) {
      if (!line.startsWith('## '))
        fail(`line ${at}: "${line.trim()}" is not a "## " heading`);

      const key = line.slice(3).trim();
      if (!SECTIONS.includes(key as SectionKey)) {
        fail(
          `line ${at}: unknown section "${key}" (allowed: ${SECTIONS.join(', ')})`
        );
      }
      if (found.has(key as SectionKey))
        fail(`line ${at}: section "${key}" appears twice`);

      // The page renders in canonical order, so a file written in another one
      // would read differently from the page it produces.
      const previous = [...found.keys()].at(-1);
      if (
        previous &&
        SECTIONS.indexOf(key as SectionKey) < SECTIONS.indexOf(previous)
      ) {
        fail(
          `line ${at}: "${key}" comes before "${previous}" in the canonical order, so it has to come before it here too (${SECTIONS.join(' → ')})`
        );
      }

      current = [];
      found.set(key as SectionKey, current);
      continue;
    }

    if (!inFence && line.startsWith('#')) {
      fail(
        `line ${at}: unexpected heading "${line.trim()}" — the "# " tagline comes first and once`
      );
    }

    current.push({ line, at });
  }

  const summary = parseBlocks(summaryLines);
  const first = summary[0];

  if (!first) fail('has no summary between the tagline and the first "## "');
  if (first.type !== 'paragraph') {
    fail('the summary has to open with a paragraph — it is what a card shows');
  }

  // Canonical order, so a file cannot reorder one project's page.
  const sections: Section[] = SECTIONS.filter((key) => found.has(key)).map(
    (key) => {
      const blocks = parseBlocks(found.get(key)!);
      if (blocks.length === 0) fail(`section "${key}" is empty`);
      return { key, blocks };
    }
  );

  return { tagline, description: first.text, summary, sections };
};

/**
 * Which entries exist, by path.
 *
 * Owner and slug come from the directory rather than from `project.json`. A
 * field holding what the path already says is a field that can disagree with
 * it, and the sync would then read one repository while the page links another.
 */
export const entryPaths = (): { owner: string; slug: string }[] =>
  directories(PROJECTS_DIR).flatMap((owner) =>
    directories(join(PROJECTS_DIR, owner)).map((slug) => ({ owner, slug }))
  );

/**
 * Reads one entry. Throws on malformed JSON or Markdown.
 *
 * Separate from `loadProjects` so the validator can catch per entry and report
 * every broken file in one run — otherwise the first parse error hides the
 * other nine, and fixing them becomes one round trip each.
 */
export const loadEntry = (owner: string, slug: string): Entry => {
  const dir = join(PROJECTS_DIR, owner, slug);
  const read = (file: string): string => readFileSync(join(dir, file), 'utf8');

  const project = JSON.parse(read('project.json')) as Project & {
    $schema?: string;
  };
  delete project.$schema;

  const i18n = Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      parseLocale(
        read(`${locale}.md`),
        `projects/${owner}/${slug}/${locale}.md`
      )
    ])
  ) as Record<Locale, LocaleContent>;

  return { owner, slug, dir, project, i18n };
};

export const loadProjects = (): Entry[] =>
  entryPaths().map(({ owner, slug }) => loadEntry(owner, slug));
