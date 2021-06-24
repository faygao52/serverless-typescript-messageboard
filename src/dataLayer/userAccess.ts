import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { User } from '../models/User'

export class UserAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly usersTable = process.env.USERS_TABLE
  ) {}

  async getAllUsers(): Promise<User[]> {
    const result = await this.docClient.scan({
      TableName: this.usersTable
    }).promise()

    const items = result.Items
    return items as User[]        
  }

  async createUser(user: User): Promise<User> {

    await this.docClient.put({
      TableName: this.usersTable,
      Item: user
    }).promise()
    
    return user
  }

  async getUser(userId: String): Promise<User> {
    const result = await this.docClient.get({
      TableName: this.usersTable,
      Key: {
        id: userId,
      }
    }).promise()
    
    return result.Item as User
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