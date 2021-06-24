export default {
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
  USERS_TABLE: "Users-${self:provider.stage}",
  BOARDS_TABLE: "Boards-${self:provider.stage}",
  USER_POSTED_BOARDS_TABLE: "User-Posted-Boards-${self:provider.stage}",
  MESSAGES_TABLE: "Messages-${self:provider.stage}",
  MESSAGE_BOARD_ID_INDEX: "MessageBoardIdIndex",
  SLS_DEBUG: "*"
}