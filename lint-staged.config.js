export default {
  '*.md': (filenames) => {
    const files = filenames.filter(
      (f) => !/(?:^|\/)(README|CLAUDE|AGENTS)\.md$/.test(f)
    );
    return files.length > 0 ? `pnpm exec oxfmt ${files.join(' ')}` : [];
  },
  '*.{json,jsonc,yml,yaml}': (filenames) => {
    const files = filenames.filter((f) => !f.includes('pnpm-lock.yaml'));
    return files.length > 0 ? `pnpm exec oxfmt ${files.join(' ')}` : [];
  },
  '*.{js,ts,mjs,cjs}': (filenames) => [
    `pnpm exec oxlint --fix --deny-warnings ${filenames.join(' ')}`,
    `pnpm exec oxfmt ${filenames.join(' ')}`
  ],

  // Both of these look at the whole repository rather than the staged files, so
  // they take no filenames and lint-staged runs each only once. An entry is
  // only ever wrong in relation to its neighbours — a caption against its code
  // block, a technology against the schema's vocabulary.
  'projects/**/*.{json,md}': () => 'pnpm validate',
  'schema/*.json': () => 'pnpm validate',
  'scripts/**/*.ts': () => 'pnpm typecheck'
};
