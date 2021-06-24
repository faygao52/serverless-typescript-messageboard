import UserAccess, { mockGetAllUsers, mockCreateUser } from '../../src/dataLayer/userAccess'

import { createUser, getUsers } from './user'

jest.mock('../../src/dataLayer/userAccess')

beforeEach(() => {
  UserAccess.mockClear()
});

describe('User Logic Tests', () => {
  describe('#createUser', () => {
    it('should create user createdAt and id set ', async () => {
      const user = await createUser('test', 'test@test.com')
      expect(mockCreateUser).toHaveBeenCalledTimes(1)
      expect(user.username).toEqual('test')
      expect(user.email).toEqual('test@test.com')
      expect(user.createdAt).not.toBeNull
      expect(user.id).not.toBeNull
    })
  })

  describe('#getUsers', () => {
    it('should return all users', async () => {
      const users = await getUsers()
      expect(mockGetAllUsers).toHaveBeenCalledTimes(1)
      expect(users.length).toEqual(1)
    })
  })
})
