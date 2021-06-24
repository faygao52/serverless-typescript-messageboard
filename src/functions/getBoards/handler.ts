import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

import { formatJSONResponse } from '@libs/apiGateway';

import { middyfy } from '@libs/lambda';
import { getAllBoards, getPostedBoardsByUserId } from 'src/logic/board'

const handler: APIGatewayProxyHandler = async (event?: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let boards
  if (event.queryStringParameters?.userId) {
    boards = await getPostedBoardsByUserId(event.queryStringParameters?.userId)
  } else {
    boards = await getAllBoards()
  }
  console.log(boards)
  return formatJSONResponse({ boards })
}

export const main = middyfy(handler);
