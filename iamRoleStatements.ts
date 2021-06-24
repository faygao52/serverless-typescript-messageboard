export default [
  {
    Effect: 'Allow',
    Action: [
      'codedeploy:*'
    ],
    Resource: [
      '*'
    ]
  },
  {
    Effect: 'Allow',
    Action: [
      'dynamodb:Scan',
      'dynamodb:GetItem',
      'dynamodb:PutItem'
    ],
    Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}'
  },
  {
    Effect: 'Allow',
    Action: [
      'dynamodb:Scan',
      'dynamodb:GetItem',
      'dynamodb:PutItem'
    ],
    Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.BOARDS_TABLE}'
  },
  {
    Effect: 'Allow',
    Action: [
      'dynamodb:Scan',
      'dynamodb:PutItem'
    ],
    Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.MESSAGES_TABLE}'
  },
  {
    Effect: 'Allow',
    Action: [
      'dynamodb:Query',
      'dynamodb:PutItem'
    ],
    Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USER_POSTED_BOARDS_TABLE}'
  },
  {
    Effect: 'Allow',
    Action: [
      'dynamodb:Query'
    ],
    Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.MESSAGES_TABLE}/index/${self:provider.environment.MESSAGE_BOARD_ID_INDEX}'
  },
]