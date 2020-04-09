"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: 'https://formats.openag.io/oada/change.schema.json',
    definitions: {
        type: {
            description: 'Indicates the type of change that occured.',
            enum: ['merge', 'delete']
        }
    },
    type: 'object',
    required: ['type', 'body'],
    properties: {
        type: { $ref: '#/definitions/type' },
        body: {
            $comment: 'Should probably narrow this schema down',
            description: 'The contents of what was changed.'
        }
    }
};
//# sourceMappingURL=change.schema.js.map