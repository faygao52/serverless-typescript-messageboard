export default {
  type: "object",
  properties: {
    boardName: { type: 'string' }
  },
  required: [ 'boardName' ],
  additionalProperties: false
} as const;
