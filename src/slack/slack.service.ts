import { Injectable, OnModuleInit } from '@nestjs/common';
import { App, ExpressReceiver } from '@slack/bolt';

@Injectable()
export class SlackService implements OnModuleInit {
  private app: App;
  private receiver: ExpressReceiver;

  constructor() {
    this.receiver = new ExpressReceiver({
      signingSecret: process.env.SLACK_SIGNING_SECRET as string,
      endpoints: {
        events: '/slack/events',
        commands: '/slack/commands',
        interactive: '/slack/interactive',
      },
    });

    this.app = new App({
      token: process.env.SLACK_BOT_TOKEN,
      receiver: this.receiver,
    });
  }

  onModuleInit() {
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    // Example event handler
    this.app.event('app_mention', async ({ event, say }) => {
      await say(`Hello <@${event.user}>!`);
    });

    // Example command handler
    this.app.command('/hello', async ({ command, ack, say }) => {
      await ack();
      await say(`Hello <@${command.user_id}>!`);
    });
  }

  getReceiver() {
    return this.receiver;
  }
}
