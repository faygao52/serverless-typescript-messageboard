import { createDynamoDBClient } from '../libs/dynamoDbClient'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Message } from '../models/Message'

export default class MessageAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly messagesTable = process.env.MESSAGES_TABLE,
    private readonly messageBoardIdIndex = process.env.MESSAGE_BOARD_ID_INDEX,
  ) {}

  async getAllMessage(boardId?: string, startFrom?: string, endAt?: string): Promise<Message[]> {
    let result
    let ExpressionAttributeValues = {}
    // If no param are given, do a scan instead of query
    if (!boardId) {
      let FilterExpression = ''
      if (startFrom) {
        endAt = endAt || new Date().toISOString()
        ExpressionAttributeValues[':startFrom'] = startFrom
        ExpressionAttributeValues[':endAt'] = endAt
        FilterExpression = 'createdAt between :startFrom and :endAt'
      }
      result = await this.docClient.scan({
        TableName: this.messagesTable,
        FilterExpression,
        ExpressionAttributeValues
      }).promise()
    } else {
      ExpressionAttributeValues = {
        ':boardId' : boardId
      }
      let KeyConditionExpression = 'boardId = :boardId'
      // If start from passed, set the end at to now
      if (startFrom) {
        endAt = endAt || new Date().toISOString()
        ExpressionAttributeValues[':startFrom'] = startFrom
        ExpressionAttributeValues[':endAt'] = endAt
        KeyConditionExpression += boardId ? ' and ' : '' 
        KeyConditionExpression += 'createdAt between :startFrom and :endAt'
      }
      result = await this.docClient.query({
          TableName: this.messagesTable,
          IndexName: this.messageBoardIdIndex,
          KeyConditionExpression,
          ExpressionAttributeValues
      }).promise()
    }

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
