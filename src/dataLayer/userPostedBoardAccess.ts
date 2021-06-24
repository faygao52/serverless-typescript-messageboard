import { createDynamoDBClient } from '../libs/dynamoDbClient'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { UserPostedBoard } from '../models/UserPostedBoard'

export default class UserPostedBoardAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly userPostedBoardsTable = process.env.USER_POSTED_BOARDS_TABLE
  ) {}

  async getAllUserPostedBoards(userId: string): Promise<UserPostedBoard[]> {
    const result = await this.docClient.query({
        TableName: this.userPostedBoardsTable,
        KeyConditionExpression:'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId }
    }).promise()

    const items = result.Items
    return items as UserPostedBoard[]        
  }

  async createUserPostedBoard(upb: UserPostedBoard): Promise<UserPostedBoard> {
    await this.docClient.put({
        TableName: this.userPostedBoardsTable,
        Item: upb
    }).promise()
    
    return upb
  }
}
