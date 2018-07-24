const Message = class {
    constructor(messageNode){
        this.messageNode = messageNode;
        this.message = messageNode.value;
    }

    getMessage() {
        return this.message;
    }

    clearMessage() {
        this.messageNode.value = "";
    }

    isEmpty() {
      const messageWithoutSpaces = this.message.replace(/ /g,'');
      const messageType = typeof this.message;
      return messageWithoutSpaces === "" || messageType === undefined;
    }
}

export default Message;
