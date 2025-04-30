import { App } from '@slack/bolt';

export const registerSlackHandlers = (app: App) => {
  // Handle app_home_opened events
  app.event('app_home_opened', async ({ event, client }) => {
    try {
      // Call views.publish with the user token
      await client.views.publish({
        // The user that opened your app's app home
        user_id: event.user,
        // The view payload that appears in the app home
        view: {
          type: 'home',
          blocks: [
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'new tasks',
                    emoji: true,
                  },
                  action_id: 'add_task',
                },
              ],
            },
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: 'Your To-Do List:',
                emoji: true,
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '☐ Finish project proposal',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '☐ Review pull requests',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '☐ Team stand-up meeting',
              },
            },
          ],
        },
      });
    } catch (error) {
      console.error('Error publishing home view:', error);
    }
  });
};
