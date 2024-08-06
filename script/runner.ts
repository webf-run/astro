import fs from 'node:fs/promises';
import path from 'node:path';

import { codegen } from '@graphql-codegen/core';
import type { Types } from '@graphql-codegen/plugin-helpers';
import { buildSchema, printSchema, parse, GraphQLSchema } from 'graphql';

import * as sdk from '../src/Plugin.js';

const schemaStr = await fs.readFile('schema.graphql', 'utf8');

const schema: GraphQLSchema = buildSchema(schemaStr);
const outputFile = './gen/output.ts';

const config: Types.GenerateOptions = {
  schema: parse(printSchema(schema)),
  documents: [],
  config: {},
  filename: outputFile,
  plugins: [{ sdk: {} }],
  pluginMap: { sdk },
};

try {
  const output = await codegen(config);

  await fs.writeFile(outputFile, output, 'utf8');
  console.log(output);
} catch (e) {
  console.error(e);
  process.exit(1);
}
