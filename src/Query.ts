import {
  getNamedType,
  isListType,
  isNonNullType,
  isNullableType,
  isOutputType,
  isScalarType,
  type GraphQLField,
  type GraphQLObjectType,
  type GraphQLOutputType,
  type GraphQLSchema,
} from 'graphql';
import { StructureKind, type SourceFile } from 'ts-morph';
import { scalarMap } from './Scalar.js';

export function processQuery(schema: GraphQLSchema, file: SourceFile) {
  const query = schema.getQueryType();

  if (!query) {
    throw 'Query type not found';
  }

  if (query.name !== 'Query') {
    throw 'Query must be named "Query"';
  }

  const fields = query.getFields();

  for (const field of Object.values(fields)) {
    // console.log(field);
    addQueryFunction(schema, field, file);
  }
}

function addQueryFunction(
  schema: GraphQLSchema,
  field: GraphQLField<any, any>,
  file: SourceFile
) {
  const func = file.addFunction({
    name: field.name,
    isAsync: true,
    statements: '',
    isExported: true,
  });

  // Add return type to the function.
  const rType = findFieldType(schema, field.type);

  func.setReturnType(`Promise<${rType}>`);

  // Add arguments to the function.
  // if (field.args.length > 0) {
  //   const args = field.args.map((arg) => `${arg.name}: ${arg.type}`);

  //   func.addParameter({
  //     name: 'args',
  //     type: `{ ${args.join(', ')} }`,
  //   });
  // }

  // // Add comments to the function.
  // if (field.description) {
  //   func.addJsDoc({
  //     description: field.description,
  //     kind: StructureKind.JSDoc,
  //   });
  // }
}

function findFieldType(
  schema: GraphQLSchema,
  oType: GraphQLOutputType,
  skipNull?: boolean
): string {
  if (isListType(oType)) {
    const rType = findFieldType(schema, oType.ofType);

    if (isNullableType(oType.ofType)) {
      return `${rType}[] | null`;
    }

    return `${rType}[]`;
  }

  // Nullable type
  if (isNullableType(oType)) {
    const fieldType = schema.getType(oType.name);

    if (!fieldType) {
      console.log(oType);
      throw `Type ${oType} not found`;
    }

    if (isScalarType(fieldType)) {
      if (skipNull) {
        return scalarMap[fieldType.name];
      } else {
        return `(${scalarMap[fieldType.name]} | null)`;
      }
    }
  }

  if (isNonNullType(oType)) {
    return findFieldType(schema, oType.ofType, true);
  }

  throw `Unhandled type: ${oType}`;
}
