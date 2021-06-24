import BoardAccess, { mockGetAllBoards, mockCreateBoard, mockGetBoard } from '../../src/dataLayer/boardAccess'
import UserAccess, {  mockGetUser } from '../../src/dataLayer/userAccess'
import UserPostedBoardAccess, { mockGetAllUpb } from '../../src/dataLayer/userPostedBoardAccess'

import { createBoard, getAllBoards, getPostedBoardsByUserId } from './board'

jest.mock('../../src/dataLayer/boardAccess')
jest.mock('../../src/dataLayer/userAccess')
jest.mock('../../src/dataLayer/userPostedBoardAccess')

beforeEach(() => {
  BoardAccess.mockClear()
  UserAccess.mockClear()
  UserPostedBoardAccess.mockClear()
});

describe('Board Logic Tests', () => {
  describe('#createBoard', () => {
    it('should create board with createdAt and id set', async () => {
      const board = await createBoard('test')
      expect(mockCreateBoard).toHaveBeenCalledTimes(1)
      expect(board.name).toEqual('test')
      expect(board.createdAt).not.toBeNull
      expect(board.id).not.toBeNull
    })
  })

  describe('#getAllBoards', () => {
    it('should return all boards', async () => {
      const boards = await getAllBoards()
      expect(mockGetAllBoards).toHaveBeenCalledTimes(1)
      expect(boards.length).toEqual(3)
    })
  })

  describe('#getPostedBoardsByUserId', () => {
    it('should throw error if user not exist', async () => {
      mockGetUser.mockImplementationOnce(() => {})
      try {
        await getPostedBoardsByUserId('1')
      } catch (e) {
        expect(e).toEqual(Error('User not found'))
      }
    })

    it('should return empty array if user never posted in boards', async () => {
      mockGetAllUpb.mockImplementationOnce(() => [])
      const boards = await getPostedBoardsByUserId('1')
      expect(mockGetUser).toHaveBeenCalledWith('1')
      expect(mockGetAllUpb).toHaveBeenCalledWith('1')
      expect(mockGetBoard).toHaveBeenCalledTimes(0)
      expect(boards.length).toEqual(0)
    })

    it('should return all boards if user has posted on multiple boards', async () => {
      mockGetAllUpb.mockImplementationOnce(() => [
        { boardId: '1', userId: 'user1' }, { boardId: '2', userId: '2' }, { boardId: '3', userId: '3' }])
      const boards = await getPostedBoardsByUserId('1')
      expect(mockGetUser).toHaveBeenCalledWith('1')
      expect(mockGetAllUpb).toHaveBeenCalledWith('1')
      expect(mockGetBoard).toHaveBeenCalledTimes(3)
      expect(boards.length).toEqual(3)
    })
  })
})
