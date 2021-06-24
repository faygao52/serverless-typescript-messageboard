import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createUser } from 'src/logic/user'

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const newUser = await createUser(event.body.username, event.body.email)
  return {
    statusCode: 201,
    body: JSON.stringify(newUser)
  }
}

export const main = middyfy(handler);
