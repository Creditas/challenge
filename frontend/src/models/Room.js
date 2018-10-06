class Room {
  constructor({ id = new Date().valueOf(), messages = [] }) {
    this.id = id;
    this.messages = messages;
  }

  get() {
    return {
      id: this.id,
      messages: this.messagesmessages
    };
  }

  set({ id, messages }) {
    this.id = id;
    this.messages = messages;
  }
}

export default Room;
