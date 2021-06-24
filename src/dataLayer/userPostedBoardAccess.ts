import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { UserPostedBoard } from '../models/UserPostedBoard'

export class UserPostedBoardAccess {
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

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    })        
  }

  return new AWS.DynamoDB.DocumentClient()
}