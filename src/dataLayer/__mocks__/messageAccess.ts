export const mockGetAllMessage = jest.fn().mockImplementation(() => [])
export const mockCreateMessage = jest.fn().mockImplementation((message) => message)

const mock = jest.fn().mockImplementation(() => {
  return {
    getAllMessage: mockGetAllMessage,
    createMessage: mockCreateMessage
  }
});

export default mock