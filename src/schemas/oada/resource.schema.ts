import { JSONSchema8 as Schema } from 'jsonschema8'

export default {
  $id: 'https://formats.openag.io/oada/resource.schema.json',
  type: 'object',
  required: ['_id', '_rev', '_meta', '_type'],
  properties: {
    _id: {
      $ref: '../oada.schema.json#/definitions/_id'
    },
    _rev: {
      $ref: '../oada.schema.json#/definitions/_rev'
    },
    _meta: {
      $ref: '../oada.schema.json#/definitions/link/definitions/versioned'
    },
    _type: {
      $ref: '../oada.schema.json#/definitions/_type'
    }
  }
} as Schema