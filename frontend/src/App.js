import ChatContainer from "./modules/ChatContainer";
import Chat from "./modules/Chat";
import "./styles.css";

(function () {
  const chatContainer = new ChatContainer();

  const chats = [
    new Chat("Chat-1"),
    new Chat("Chat-2")
  ];

  chatContainer.loadChats(chats);
})();
