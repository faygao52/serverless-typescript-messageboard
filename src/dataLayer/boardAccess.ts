import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createDynamoDBClient } from '../libs/dynamoDbClient'

import { Board } from '../models/Board'

export default class BoardAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly boardsTable = process.env.BOARDS_TABLE
  ) {}

  async getAllBoards(): Promise<Board[]> {
    const result = await this.docClient.scan({
      TableName: this.boardsTable
    }).promise()

    const items = result.Items
    return items as Board[]        
  }

  async createBoard(board: Board): Promise<Board> {
    await this.docClient.put({
      TableName: this.boardsTable,
      Item: board
    }).promise()
    
    return board
  }

  async getBoard(boardId: String): Promise<Board> {
    const result = await this.docClient.get({
      TableName: this.boardsTable,
      Key: {
        id: boardId,
      }
    }).promise()
    
    return result.Item as Board
  }
}