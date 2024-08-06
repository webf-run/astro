import type { GraphQLObjectType } from 'graphql';

export function processQuery(query: GraphQLObjectType) {

  if (query.name !== 'Query') {
    throw 'Query must be named "Query"';
  }

  const fields = query.getFields();

}
