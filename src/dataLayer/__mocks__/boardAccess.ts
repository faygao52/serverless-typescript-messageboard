export const mockGetAllBoards = jest.fn().mockImplementation(() => (
  [
    {
      id : '1', name: 'board 1', createAt: '2021-06-24T01:04:13.381Z'
    },
    {
      id : '2', name: 'board 2', createAt: '2021-06-24T01:04:13.381Z'
    },
    {
      id: '3', name: 'board 3', createAt: '2021-06-24T01:04:13.381Z'
    }
  ]
))
export const mockCreateBoard = jest.fn().mockImplementation((board) => board)
export const mockGetBoard = jest.fn().mockImplementation(
  (id) => ({ id, name: 'test', createdAt: '2021-06-24T08:51:47.284Z'})
)

const mock = jest.fn().mockImplementation(() => {
  return {
    getAllBoards: mockGetAllBoards,
    createBoard: mockCreateBoard,
    getBoard: mockGetBoard
  }
});

export default mock