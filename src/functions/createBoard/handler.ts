import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createBoard } from 'src/logic/board'

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const newBoard = await createBoard(event.body.boardName)
  return {
    statusCode: 201,
    body: JSON.stringify(newBoard)
  }
}

export const main = middyfy(handler);
