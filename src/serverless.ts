import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Context, Handler } from 'aws-lambda';
import { INestApplication } from '@nestjs/common';
import { Express } from 'express';
import * as express from 'express';
import { createServer, proxy } from 'aws-serverless-express';
import { Server } from 'http';

let server: Server;

async function createExpressApp(
  expressApp: Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  return app;
}

async function bootstrap() {
  const expressApp = express();
  const app = await createExpressApp(expressApp);
  await app.init();
  return createServer(expressApp);
}

export const handler: Handler = async (event: any, context: Context) => {
  server = server ?? (await bootstrap());
  return proxy(server, event, context, 'PROMISE').promise;
};
