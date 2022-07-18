import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class DatabaseService {
  connect(): AWS.DynamoDB.DocumentClient {
    return process.env.IS_OFFLINE
      ? new AWS.DynamoDB.DocumentClient({
          region: 'localhost',
          endpoint: process.env.DYNAMODB_ENDPOINT,
        })
      : new AWS.DynamoDB.DocumentClient();
  }
}
