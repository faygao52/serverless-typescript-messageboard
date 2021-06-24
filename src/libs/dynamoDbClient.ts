import * as AWS from 'aws-sdk'

export const createDynamoDBClient = () => {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    })        
  }
  if (process.env.JEST_WORKER_ID) {
    console.log('Mocking up DynamoDB instance')
    return new AWS.DynamoDB.DocumentClient({
      convertEmptyValues: true,
      endpoint: 'localhost:8000',
      sslEnabled: false,
      region: 'local-env',
    })        
  }
  return new AWS.DynamoDB.DocumentClient()
}
