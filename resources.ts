export default {
  Resources: {
    'UserDynamoDBTable': {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S'
          }
        ],
        KeySchema: [{
          AttributeName: 'id',
          KeyType: 'HASH'
        }],
        BillingMode: 'PAY_PER_REQUEST',
        TableName: "${self:provider.environment.USERS_TABLE}"
      }
    },
    'BoardsDynamoDBTable': {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S'
          }
        ],
        KeySchema: [{
          AttributeName: 'id',
          KeyType: 'HASH'
        }],
        BillingMode: 'PAY_PER_REQUEST',
        TableName: "${self:provider.environment.BOARDS_TABLE}"
      }
    },
    'UserPostedBoardsDynamoDBTable': {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        AttributeDefinitions: [
          {
            AttributeName: 'userId',
            AttributeType: 'S'
          },
          {
            AttributeName: 'boardId',
            AttributeType: 'S'
          }
        ],
        KeySchema: [{
          AttributeName: 'userId',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'boardId',
          KeyType: 'range'
        }],
        BillingMode: 'PAY_PER_REQUEST',
        TableName: "${self:provider.environment.USER_POSTED_BOARDS_TABLE}"
      }
    },
    'MessagesDynamoDBTable': {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S'
          },
          {
            AttributeName: 'createdAt',
            AttributeType: 'S'
          },
          {
            AttributeName: 'boardId',
            AttributeType: 'S'
          }
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH'
          }
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "${self:provider.environment.MESSAGE_CREATED_AT_INDEX}",
            KeySchema: [
              {
                AttributeName: 'id',
                KeyType: 'HASH'
              },    
              {
                AttributeName: 'createdAt',
                KeyType: 'RANGE'
              }
            ],
            Projection: {
              ProjectionType: 'ALL'
            }
          },
          {
            IndexName: "${self:provider.environment.MESSAGE_BOARD_ID_INDEX}",
            KeySchema: [
              {
                AttributeName: 'boardId',
                KeyType: 'HASH'
              },
              {
                AttributeName: 'createdAt',
                KeyType: 'RANGE'
              }
            ],
            Projection: {
              ProjectionType: 'ALL'
            }
          }
        ],
        BillingMode: 'PAY_PER_REQUEST',
        TableName: "${self:provider.environment.MESSAGES_TABLE}"
      }
    },
  }
}