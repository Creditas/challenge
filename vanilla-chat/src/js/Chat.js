import { ChatController } from './ChatController';

export class Chat {

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      new ChatController('#app').init();
    })
  }
}