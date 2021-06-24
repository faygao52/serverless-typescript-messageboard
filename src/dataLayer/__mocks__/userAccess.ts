export const mockGetAllUsers = jest.fn().mockImplementation(() => (
  [
    {
      id : '1', username: 'User 1', email: 'user1@test.com', createAt: '2021-06-24T01:04:13.381Z'
    },
  ]
))
export const mockCreateUser = jest.fn().mockImplementation((user) => user)
export const mockGetUser = jest.fn().mockImplementation(
  (id) => ({ id, name: 'test', createdAt: '2021-06-24T08:51:47.284Z'})
)

const mock = jest.fn().mockImplementation(() => {
  return {
    getAllUsers: mockGetAllUsers,
    createUser: mockCreateUser,
    getUser: mockGetUser
  }
});

export default mock