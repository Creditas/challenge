export class Message {
 
    constructor(content, date, sender) {
      this.content = content;
      this.date = date;
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
}