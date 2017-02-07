import { PubSub } from '../app/utils/pubsub'; 
import { uidGenerator } from '../app/utils/index';
import { ChatBox } from '../app/ChatBox';
import { components } from '../app/components/index';



/**
 * @class ChatApp
 * @param rootElement
 * @param store
 * @param components
 */
class ChatApp {
    constructor(rootElement, store, components) {        
        this.rootElement = rootElement;
        this.store = store;
        this.components = components;
        this.id = uidGenerator();
        
    }        

    init () {        
        let chatBox = new ChatBox(this.id, this.store, this.rootElement, components);
    }

}


// ============================================================================================ //
//  DOM EVENTS HERE
// ============================================================================================ //
document.addEventListener('DOMContentLoaded', function () {
    let rootEl = '#chatsContainer';

    var pubsub = new PubSub();
    var chat = new ChatApp(rootEl, pubsub);
    chat.init();

    // add new chat button
    document.querySelector('.newChat').onclick = () => {
        let c = new ChatApp(rootEl, pubsub);
        c.init();
    };
});
