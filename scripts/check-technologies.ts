import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './projects.ts';

/**
 * Parity check between the schema's technologies vocabulary and its original,
 * `app/Enums/Technology.php` in `kirchDev/app`.
 *
 * The schema is a copy of that enum, and a copy can drift. CI cannot read the
 * app — it is a private repository — so this runs wherever the clone sits
 * beside this one in the forgemap layout, and skips quietly where it does not.
 * That makes it a local safety net, not a gate: the gate is whoever extends
 * the enum remembering that the copy exists, which is exactly what this check
 * is here to catch.
 */
const enumPath = join(ROOT, '..', 'app', 'app', 'Enums', 'Technology.php');

if (!existsSync(enumPath)) {
  console.log('– technologies parity skipped: no app clone beside this repo.');
  process.exit(0);
}

const cases = [
  ...readFileSync(enumPath, 'utf8').matchAll(/^\s*case \w+ = '([^']+)';/gm)
].map((match) => match[1]!);

const schema = JSON.parse(
  readFileSync(join(ROOT, 'schema', 'project.schema.json'), 'utf8')
) as {
  properties: {
    technologies: { items: { enum: string[] } };
  };
};

const listed = schema.properties.technologies.items.enum;

const problems = [
  ...cases
    .filter((value) => !listed.includes(value))
    .map(
      (value) => `"${value}" is in the app enum but missing from the schema`
    ),
  ...listed
    .filter((value) => !cases.includes(value))
    .map((value) => `"${value}" is in the schema but not in the app enum`)
];

if (problems.length > 0) {
  for (const problem of problems) console.error(`✖ ${problem}`);
  process.exit(1);
}

console.log(
  `✔ technologies vocabulary matches the app enum (${cases.length} keys).`
);
