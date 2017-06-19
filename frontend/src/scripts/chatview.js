class ChatView{
    constructor(placeholder){

        this.id = Math.round(Math.random() * 1000000000000000);
        this.tpl = `
        <div class="messages" id="${this.id}">
        <ul class="message-list"></ul>

        <div class="message-input">
            <input type="text" />
            <button type="button">Enviar</button>
        </div>
        </div>`;
        placeholder.innerHTML = this.tpl;
        console.log(this.tpl);

        return this.tpl;
    }
}


export default ChatView;
