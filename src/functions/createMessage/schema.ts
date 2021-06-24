export default {
  type: "object",
  properties: {
    boardId: { type: 'string' },
    userId: { type: 'string' },
    content: { type: 'string' }
  },
  required: [ 'boardId', 'userId' ],
  additionalProperties: false
} as const;
