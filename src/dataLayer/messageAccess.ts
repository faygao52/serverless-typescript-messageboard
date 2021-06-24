import { createDynamoDBClient } from '../libs/dynamoDbClient'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Message } from '../models/Message'

export default class MessageAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly messagesTable = process.env.MESSAGES_TABLE,
    private readonly messageBoardIdIndex = process.env.MESSAGE_BOARD_ID_INDEX,
    private readonly messageCreatedAtIndex = process.env.MESSAGE_CREATED_AT_INDEX
  ) {}

  async getAllMessage(boardId?: string, startFrom?: string, endAt?: string): Promise<Message[]> {
    let ExpressionAttributeValues = {}
    let IndexName = this.messageCreatedAtIndex
    let KeyConditionExpression = ''

    if (boardId) {
      IndexName = this.messageBoardIdIndex
      ExpressionAttributeValues[':boardId'] = boardId
      KeyConditionExpression = 'boardId = :boardId'
    }

    // If start from passed, set the end at to now
    if (startFrom) {
      endAt = endAt || new Date().toISOString()
      ExpressionAttributeValues[':startFrom'] = startFrom
      ExpressionAttributeValues[':endAt'] = endAt
      KeyConditionExpression += boardId ? ' and ' : '' 
      KeyConditionExpression += 'createdAt between :startFrom and :endAt'
    }
    const result = await this.docClient.query({
        TableName: this.messagesTable,
        IndexName,
        KeyConditionExpression,
        ExpressionAttributeValues
    }).promise()

    const items = result.Items
    return items as Message[]        
  }

  async createMessage(message: Message): Promise<Message> {
    await this.docClient.put({
        TableName: this.messagesTable,
        Item: message
    }).promise()
    
    return message
  }
}
