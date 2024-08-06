import { type CodegenPlugin, type PluginFunction } from '@graphql-codegen/plugin-helpers';


export const plugin: PluginFunction = async (schema, documents, config, info) => {
  // throw new Error('Not implemented');
  const typesMap = schema.getTypeMap();

  const query = schema.getQueryType();

  if (query) {
    query.getFields();
  }

  return 'Done!';
};

const pluginObject: CodegenPlugin = {
  plugin,
};

export default pluginObject;
