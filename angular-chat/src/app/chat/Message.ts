// An interface to create messages
export class Message {

  // the text of the message itself
  private content: string

  // the timestamp when the message was sent
  private date: Date

  // who sent the message
  private sender: string

  constructor(content: string, date: Date, sender: string) {
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
