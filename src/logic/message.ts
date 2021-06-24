import { Message } from '../../src/models/Message'
import MessageAccess from '../../src/dataLayer/messageAccess'
import BoardAccess from '../../src/dataLayer/boardAccess'
import UserAccess from '../../src/dataLayer/userAccess'
import UserPostedBoardAccess from '../../src/dataLayer/userPostedBoardAccess'
import { v4 as uuidv4 } from 'uuid'

const messageAccess = new MessageAccess()
const boardAccess = new BoardAccess()
const userAccess = new UserAccess()
const userPostedBoardAccess = new UserPostedBoardAccess()

export const createMessage = async (boardId: string, userId: string, content: string): Promise<Message> => {
  const user = await userAccess.getUser(userId)
  if (!user) {
    throw Error("User not found")
  }
  const board = await boardAccess.getBoard(boardId)
  if (!board) {
    throw Error("Board not found")
  }
  const message = await messageAccess.createMessage({
    id: uuidv4(),
    boardId,
    userId,
    content,
    createdAt: new Date().toISOString()
  } as Message)
  // Create userPostedBoard
  // TODO: need to query if posted board exists, if exists then increate the count
  if (message) {
    userPostedBoardAccess.createUserPostedBoard({
      id: uuidv4(),
      userId,
      boardId,
      count: 1
    })
  }
  return message
}

export const getMessages = async (boardId?: string, startFrom? :string, endAt? :string): Promise<Message[]> => {
  return messageAccess.getAllMessage(boardId, startFrom, endAt)
}

