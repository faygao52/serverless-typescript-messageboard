import { createDynamoDBClient } from '../libs/dynamoDbClient'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { User } from '../models/User'

export default class UserAccess {
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