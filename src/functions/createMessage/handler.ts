import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createMessage } from 'src/logic/message'

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const newMessage = await createMessage(event.body.boardId, event.body.userId, event.body.content)
  return {
    statusCode: 201,
    body: JSON.stringify(newMessage)
  }
}

export const main = middyfy(handler);
