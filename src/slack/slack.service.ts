import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class SlackService implements OnModuleInit {
  onModuleInit() {
    this.setupEventHandlers();
  }

  private setupEventHandlers() {}
}
