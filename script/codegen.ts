import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  // documents: ['src/**/*.ts', 'src/**/*.tsx'],
  documents: [],
  emitLegacyCommonJSImports: false,
  generates: {
    './gen/output.ts': {
      plugins: ['./dist/Plugin.js']
    },
  },
};

export default config;
