import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

import { formatJSONResponse } from '@libs/apiGateway';

import { middyfy } from '@libs/lambda';
import { getUsers } from 'src/logic/user'

const handler: APIGatewayProxyHandler = async (event?: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const users = await getUsers()
  return formatJSONResponse({ users })
}

export const main = middyfy(handler);
