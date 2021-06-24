export default {
  type: "object",
  properties: {
    username: { type: 'string' },
    email: { type: 'string' }
  },
  required: [ 'username', 'email' ],
  additionalProperties: false
} as const;
