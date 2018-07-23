"use strict";

import DOMHandler from "./modules/DOMHandler";
import ChatContainer from "./modules/ChatContainer";
import Chat from "./modules/Chat";
import styles from "./styles.css";

const App = (function () {

    const chatContainer = new ChatContainer(DOMHandler.getElement(".chat-container"));
    const chats = [
        new Chat("Chat-1"),
        new Chat("Chat-2")
    ];

    chatContainer.loadChats(chats);
})();
