import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/link/v1.schema.json',
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  description: 'OADA Link object',
  definitions: {
    link: {
      anyOf: [
        {
          $ref: '#/definitions/nonversioned'
        },
        {
          $ref: '#/definitions/versioned'
        }
      ]
    },
    nonversioned: {
      type: 'object',
      required: ['_id'],
      additionalProperties: true,
      properties: {
        _id: {
          type: 'string'
        }
      }
    },
    versioned: {
      type: 'object',
      required: ['_rev', '_id'],
      additionalProperties: true,
      properties: {
        _id: {
          type: 'string'
        },
        _rev: {
          type: 'string',
          pattern: '^[0-9]+-.+'
        }
      }
    },
    list: {
      definitions: {
        versioned: {
          type: 'object',
          additionalProperties: {
            $ref: '#/definitions/versioned'
          }
        },
        nonversioned: {
          type: 'object',
          additionalProperties: {
            $ref: '#/definitions/nonversioned'
          }
        }
      },
      type: 'object',
      additionalProperties: {
        $ref: '#/definitions/link'
      }
    }
  },
  examples: [
    {
      _id: 'akjf92jxcJds',
      _rev: '1-jxusuf3sc'
    }
  ]
}

export default schema
