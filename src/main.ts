import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { App, ExpressReceiver } from '@slack/bolt';
import * as express from 'express';
import { AppModule } from './app.module';

export const createSlackApp = (options?: {
  expressReceiver?: { app: express.Application };
}) => {
  const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET as string,
    app: options?.expressReceiver?.app,
  });

  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver,
  });

  return app;
};

async function bootstrap() {
  const expressApp = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  const slackApp = createSlackApp({
    expressReceiver: {
      app: expressApp,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
