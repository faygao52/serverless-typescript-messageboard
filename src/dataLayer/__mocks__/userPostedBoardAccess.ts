export const mockGetAllUpb = jest.fn().mockImplementation(() => (
  [
    {
      userId : '1', boardId: '1'
    },
  ]
))
export const mockCreateUpb = jest.fn().mockImplementation((upb) => upb)
const mock = jest.fn().mockImplementation(() => {
  return {
    getAllUserPostedBoards: mockGetAllUpb,
    createUserPostedBoard: mockCreateUpb,
  }
});

export default mock