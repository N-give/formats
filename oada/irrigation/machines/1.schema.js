'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.default = {
  $id: 'https://formats.openag.io/oada/irrigation/machines/1.schema.json',
  description: 'application/vnd.oada.irrigation.machines.1+json',
  required: ['name', 'list'],
  additionalProperties: true,
  properties: {
    name: {
      type: 'string',
      pattern: 'irrigation'
    },
    list: {
      $ref:
        'https://formats.openag.io/oada/link/1.schema.json#/definitions/list'
    }
  },
  examples: [
    {
      name: 'irrigation',
      list: {
        dummyrandomthing: {
          _id: 'dummyid123AFG',
          _rev: '1-dummy02ijfl'
        },
        klsdfj0982ifjoow: {
          _id: 'df002jfk2ojsl',
          _rev: '3-jkfd0ijs8zk'
        }
      }
    }
  ]
}
//# sourceMappingURL=1.schema.js.map
