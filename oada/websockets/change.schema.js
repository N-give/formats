"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: 'https://formats.openag.io/oada/websockets/change.schema.json',
    description: 'This is the format of an OADA websocket change notification (server to client)',
    definitions: {
        id: {
            $ref: 'request.schema.json#/properties/requestId'
        },
        path_leftover: {
            $ref: '../../oada.schema.json#/definitions/path'
        }
    },
    type: 'object',
    required: ['requestId', 'resourceId', 'path_leftover', 'change'],
    properties: {
        requestId: {
            type: 'array',
            minItems: 1,
            items: {
                $ref: '#/definitions/id'
            }
        },
        resourceId: {
            $ref: '../../oada.schema.json#/definitions/_id'
        },
        path_leftover: {
            anyOf: [
                {
                    type: 'array',
                    minItems: 1,
                    items: {
                        $ref: '#/definitions/path_leftover'
                    }
                },
                { $ref: '#/definitions/path_leftover' }
            ]
        },
        change: {
            $ref: '../change.schema.json#'
        }
    }
};
//# sourceMappingURL=change.schema.js.map