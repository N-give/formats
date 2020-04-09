'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.default = {
  $id: 'https://formats.openag.io/oada/irrigation/1.schema.json',
  description: 'application/vnd.oada.irrigation.1+json',
  additionalProperties: true,
  properties: {
    machines: {
      $ref:
        'https://formats.openag.io/oada/link/1.schema.json#/definitions/versioned'
    }
  },
  examples: [
    {
      machines: {
        _id: 'dummyid123AFG',
        _rev: '1-dummy02ijfl'
      }
    }
  ]
}
//# sourceMappingURL=1.schema.js.map
