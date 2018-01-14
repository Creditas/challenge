export class Message {
  private content: string
  private date: Date
  private sender: string

  constructor(content: string, date: Date, sender: string) {
    this.content = content;
    this.date = date;
    this.sender = sender;
  }

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
