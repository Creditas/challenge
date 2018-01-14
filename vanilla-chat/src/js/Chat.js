import { ChatController } from './ChatController';

// Build a chat into the 'selectorPlaholder' parameter
export class Chat {

  constructor(selectorplaceholder) {
    
    this.domElementSelector = selectorplaceholder;
  }
  
  init(selectorPlaholder) {
    
    // runs the chat controller whent dom is ready
    document.addEventListener('DOMContentLoaded', () => {
      new ChatController(this.domElementSelector).init();
    })
  }
}