import guid from '../helpers/guid';

class Room {
  constructor({ id = guid(), messages = [] }) {
    this.id = id;
    this.messages = messages;
  }

  get() {
    return {
      id: this.id,
      messages: this.messages
    };
  }

  set({ id, messages }) {
    this.id = id;
    this.messages = messages;
  }
}

export default Room;
