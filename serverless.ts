import type { AWS } from '@serverless/typescript';

import environment from 'environment';
import resources from 'resources';
import functions from 'functions';
import iamRoleStatements from 'iamRoleStatements'

const serverlessConfiguration: AWS = {
  app: 'messageboard',
  service: 'messageboard-api',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    'serverless-offline': {
      httpPort: 3003
    },
    dynamodb: {
      stages: [ 'dev' ],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true
      }
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-plugin-canary-deployments',
    'serverless-dynamodb-local',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements,
    environment,
    lambdaHashingVersion: '20201221',
    // @ts-ignore
    region: "${opt:region, 'ap-southeast-2'}",
    stage: "${opt:stage, 'dev'}",
  },
  functions,
  resources
};

module.exports = serverlessConfiguration;
