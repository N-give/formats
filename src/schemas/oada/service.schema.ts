import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/service.schema.json',
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  description: 'The format for the collection of @oada/jobs items.',
  type: 'object',
  properties: {
    jobs: {
      $ref: '../oada.schema.json#/definitions/link/definitions/unversioned'
    },
    watches: {
      $ref: '../oada.schema.json#/definitions/link/definitions/unversioned'
    }
  },
  examples: [
    {
      jobs: {
        _id: 'resources/KXxjds93'
      },
      watches: {
        _id: 'resources/glakceo3r'
      }
    }
  ]
}

export default schema
