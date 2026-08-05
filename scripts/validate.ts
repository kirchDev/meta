import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import ajvModule from 'ajv/dist/2020.js';
import ajvFormatsModule from 'ajv-formats';
import {
  type Block,
  type Entry,
  LOCALES,
  ROOT,
  entryPaths,
  loadEntry
} from './projects.ts';

/**
 * Both packages ship CommonJS. Node's ESM interop hands back `module.exports`,
 * which is the constructor itself — but under `moduleResolution: NodeNext`
 * TypeScript reads their ESM-shaped `.d.ts` and types the default import as the
 * module namespace instead. The value is already right at runtime; only its
 * type needs correcting, so this casts rather than reaching for `.default`.
 */
const Ajv = ajvModule as unknown as typeof ajvModule.default;
const addFormats =
  ajvFormatsModule as unknown as typeof ajvFormatsModule.default;

/**
 * The gate `pnpm check` runs and CI enforces, offline.
 *
 * Two kinds of rule live here. The schema covers one entry in isolation —
 * shape, enums, required fields. Everything below it is what a schema
 * structurally cannot see: agreement between `project.json` and the Markdown
 * beside it, and between an entry and the path it sits at.
 *
 * The point of the gate is stated in the entry's own terms: without it a typo
 * in a category or a technology drops a project off the page, or splits one
 * filter chip into two — with no error and nothing to notice.
 */
const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);

const schema: object = JSON.parse(
  readFileSync(join(ROOT, 'schema', 'project.schema.json'), 'utf8')
);
const validateSchema = ajv.compile(schema);

const errors: string[] = [];
const entries: Entry[] = [];
const paths = entryPaths();

// Load one at a time: a file that fails to parse is reported alongside every
// other problem instead of hiding them behind the first throw.
for (const { owner, slug } of paths) {
  try {
    entries.push(loadEntry(owner, slug));
  } catch (error) {
    // A parse error already names the file it came from; a JSON one does not.
    const message = error instanceof Error ? error.message : String(error);
    errors.push(
      message.startsWith('projects/')
        ? message
        : `projects/${owner}/${slug}/project.json: ${message}`
    );
  }
}

for (const { owner, slug, project, i18n } of entries) {
  const where = `projects/${owner}/${slug}`;
  const fail = (message: string): number => errors.push(`${where}: ${message}`);

  if (!validateSchema(project)) {
    for (const error of validateSchema.errors ?? []) {
      // Conditional rules report as "must match then schema" and a bare
      // required-property complaint, neither of which says what is actually
      // wrong. They are restated by name below instead.
      if (error.schemaPath.includes('/allOf/')) continue;

      const path = error.instancePath || '/';
      const allowed =
        'allowedValues' in (error.params as Record<string, unknown>)
          ? ` (allowed: ${(error.params.allowedValues as string[]).join(', ')})`
          : '';
      fail(`project.json${path} ${error.message}${allowed}`);
    }
  }

  /** The conditional rules of the schema, restated so their failure reads. */
  const readsGithub = project.github !== false;

  if (readsGithub && project.license !== undefined) {
    fail(
      'project.json: drop "license" — the sync reads it off the repository. Only a "github": false entry states its own'
    );
  }

  if (readsGithub && project.activity === 'legacy') {
    fail(
      'project.json: "activity": "legacy" is only for a "github": false entry — for a public repository, archive it on GitHub and the sync picks that up'
    );
  }

  /**
   * `about` and `why` are one slot filled two ways, so an entry picks one.
   * Carrying both prints "Über das Projekt" and "Hintergrund" one after the
   * other, each answering what the one before it just answered.
   */
  for (const locale of LOCALES) {
    const keys = i18n[locale].sections.map((section) => section.key);
    if (keys.includes('about') && keys.includes('why')) {
      fail(
        `${locale}.md: "## about" and "## why" are the same slot, keep one. "why" is for an entry that answers a problem, "about" for one that solves nothing and simply is`
      );
    }
  }

  /**
   * The repository link is derived from the path, so listing it would be a
   * second place to get it wrong — and on a `github: false` entry it would leak
   * exactly what that flag exists to withhold.
   */
  for (const link of project.links ?? []) {
    if (/^https:\/\/(www\.)?github\.com\//.test(link.url)) {
      fail(
        `project.json links: the repository link is derived, drop ${link.url}`
      );
    }
  }

  /**
   * Every language has to show the same STRUCTURE — same sections in the same
   * order, same blocks inside them, same number of list items. The wording
   * differs, and a code sample may too (a comment gets translated); what may
   * not differ is what the reader is offered.
   */
  const [reference, ...rest] = LOCALES;

  /** One comparable line per block, content deliberately left out. */
  const shape = (blocks: Block[]): string[] =>
    blocks.map((block) =>
      block.type === 'list'
        ? `list(${block.items.length})`
        : block.type === 'code'
          ? `code:${block.language}`
          : 'paragraph'
    );

  const compare = (
    where: string,
    a: Block[],
    b: Block[],
    locale: string
  ): void => {
    const left = shape(a);
    const right = shape(b);

    if (left.length !== right.length) {
      fail(
        `${locale}.md: ${where} has ${right.length} block(s), ${reference}.md has ${left.length}`
      );
      return;
    }

    for (const [index, expected] of left.entries()) {
      if (right[index] !== expected) {
        fail(
          `${locale}.md: ${where} block ${index + 1} is ${right[index]}, but ${expected} in ${reference}.md`
        );
      }
    }
  };

  for (const locale of rest) {
    compare(
      'the summary',
      i18n[reference].summary,
      i18n[locale].summary,
      locale
    );

    const here = i18n[locale].sections.map((section) => section.key);
    const there = i18n[reference].sections.map((section) => section.key);

    for (const key of there) {
      if (!here.includes(key)) fail(`${locale}.md has no "## ${key}" section`);
    }
    for (const key of here) {
      if (!there.includes(key))
        fail(`${reference}.md has no "## ${key}" section`);
    }

    for (const section of i18n[reference].sections) {
      const other = i18n[locale].sections.find((s) => s.key === section.key);
      if (other)
        compare(`"${section.key}"`, section.blocks, other.blocks, locale);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`✖ ${error}`);
  console.error(`\n${errors.length} problem(s) in ${paths.length} entries.`);
  process.exit(1);
}

console.log(`✔ ${paths.length} entries valid.`);
