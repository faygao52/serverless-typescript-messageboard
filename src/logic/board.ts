import { Board } from '../../src/models/Board'
import BoardAccess from '../../src/dataLayer/boardAccess'
import UserAccess from '../../src/dataLayer/userAccess'
import UserPostedBoardAccess from '../../src/dataLayer/userPostedBoardAccess'
import { v4 as uuidv4 } from 'uuid'

const boardAccess = new BoardAccess()
const userAccess = new UserAccess()
const userPostedBoardAccess = new UserPostedBoardAccess()

export const createBoard = async (name: string): Promise<Board> => {
  return boardAccess.createBoard({
    id: uuidv4(),
    name,
    createdAt: new Date().toISOString(),
  } as Board)
}

export const getAllBoards = async (): Promise<Board[]> => {
  return boardAccess.getAllBoards()
}

export const getPostedBoardsByUserId = async (userId: string): Promise<Board[]> => {
  const user = await userAccess.getUser(userId)
  if (!user) {
    throw Error("User not found")
  }
  const postedBoards = await userPostedBoardAccess.getAllUserPostedBoards(userId)
  const boards = await Promise
    .all(postedBoards.map(pb => boardAccess.getBoard(pb.boardId)))
  return boards
}
