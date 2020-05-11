import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/service/queues.schema.json',
  description: 'The format for @oada/jobs queues list',
  type: 'object',
  patternProperties: {
    '^.*$': {
      $ref: './queue.schema.json'
    }
  },
  additionalProperties: false,
  examples: [
    {
      asdxjkacsdj: {
        domain: 'https://dev.trellis.one',
        token: 'abc1234321cba',
        path: '/bookmarks/services/MyCoolService'
      }
    }
  ]
}

export default schema
