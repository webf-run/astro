import {
  type CodegenPlugin,
  type PluginFunction,
} from '@graphql-codegen/plugin-helpers';
import { Project, ScriptKind, ScriptTarget } from 'ts-morph';

import { processQuery } from './Query.js';

export const plugin: PluginFunction = async (
  schema,
  documents,
  config,
  info
) => {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      target: ScriptTarget.ESNext,
    },
  });

  const sourceFile = project.createSourceFile('main.ts', '', {
    scriptKind: ScriptKind.TS,
  });

  processQuery(schema, sourceFile);

  const generated = sourceFile.getFullText();

  return generated;
};

const pluginObject: CodegenPlugin = {
  plugin,
};

export default pluginObject;
