// Message interface to hold message data
export class Message {
  
  constructor(content, date, sender) {
    
    // the message text itself
    this.content = content;

    // the timestamp when message was sent
    this.date = date;

    // who has sent the message
    this.sender = sender;
  }
  
  // help methods: getters
  
  getContent() {
    return this.content;
  }
  
  getDate() {
    return this.date;
  }
  
  getSender() {
    return this.sender;
  }
}