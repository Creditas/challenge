export class ChatModel {

  constructor() {

    this.historyMessageList = [];
  }

  init() {
  
  }

  getAllMessages() {

    return [].concat( this.historyMessageList );
  }

  sendAllMessages() {

  }

  addMessage(msg) {

    if( msg.content && msg.date && msg.sender ) {
      this.historyMessageList.push(msg)
    }
    else {
      throw new Error('The argument needs to be a Message instance.');
    }
  }

  cleanAllMessages() {
    this.historyMessageList = [];
  }
}