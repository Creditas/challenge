import { ChatView } from './ChatView';
import { ChatModel } from './ChatModel';

export class ChatController {

  constructor(selectorplaceholder) {
    
    this.model = new ChatModel();
    this.view = new ChatView(selectorplaceholder);
  }

  init() {
    
    this.model.init();
    this.view.init();
  }
}