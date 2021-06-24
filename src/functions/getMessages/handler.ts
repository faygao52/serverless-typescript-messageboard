import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

import { formatJSONResponse } from '@libs/apiGateway';

import { middyfy } from '@libs/lambda';
import { getMessages } from 'src/logic/message'

const handler: APIGatewayProxyHandler = async (event?: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const messages = await getMessages(
    event.queryStringParameters?.boardId,
    event.queryStringParameters?.startFrom,
    event.queryStringParameters?.endAt
    )
  return formatJSONResponse({ messages })
}

export const main = middyfy(handler);
