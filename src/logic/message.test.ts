import BoardAccess, { mockGetBoard } from '../../src/dataLayer/boardAccess'
import UserAccess, { mockGetUser } from '../../src/dataLayer/userAccess'
import UserPostedBoardAccess, { mockCreateUpb } from '../../src/dataLayer/userPostedBoardAccess'
import MessageAccess, { mockGetAllMessage, mockCreateMessage } from '../../src/dataLayer/messageAccess'
import { createMessage, getMessages } from './message'

jest.mock('../../src/dataLayer/boardAccess')
jest.mock('../../src/dataLayer/userAccess')
jest.mock('../../src/dataLayer/userPostedBoardAccess')
jest.mock('../../src/dataLayer/messageAccess')

beforeEach(() => {
  BoardAccess.mockClear()
  UserAccess.mockClear()
  UserPostedBoardAccess.mockClear()
  MessageAccess.mockClear()
});

describe('Message Logic Tests', () => {
  describe('#createMessage', () => {
    it('should not create a message and throw error if user not exist ', async () => {
      mockGetUser.mockImplementationOnce(() => {})
      try {
        await createMessage('b1', 'u1', 'content')
      } catch (e) {
        expect(e).toEqual(Error('User not found'))
      }
    })

    it('should not create a message and throw error if board not exist ', async () => {
      mockGetBoard.mockImplementationOnce(() => {})
      try {
        await createMessage('b1', 'u1', 'content')
      } catch (e) {
        expect(e).toEqual(Error('Board not found'))
      }
    })

    it('should return a message with uuid and createdAt set', async () => {
      const message = await createMessage('b1', 'u1', 'content')
      expect(mockGetUser).toHaveBeenCalledWith('u1')
      expect(mockGetBoard).toHaveBeenCalledWith('b1')
      expect(mockCreateUpb).toHaveBeenCalledTimes(1)
      expect(mockCreateMessage).toHaveBeenCalledTimes(1)
      expect(message.content).toEqual('content')
      expect(message.boardId).toEqual('b1')
      expect(message.userId).toEqual('u1')
      expect(message.createdAt).not.toBeNull
      expect(message.id).not.toBeNull
    })
  })

  describe('#getAllMessages', () => {
    it('should return all message', async () => {
      const messages = await getMessages('1', '2011', '2020')
      expect(mockGetAllMessage).toHaveBeenCalledTimes(1)
      expect(messages.length).toEqual(0)
    })
  })
})
