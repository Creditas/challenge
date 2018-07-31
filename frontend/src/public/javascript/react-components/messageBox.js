'use strict';

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', created: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    var createdMessage;

    if (this.state.items.length  != 0) {
      createdMessage = "Última atualização: " + new Intl.DateTimeFormat('pt-BR', { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(this.state.created)
    }

    var textareaMessage = React.createElement("input", {
      id: "new-message",
      name: "new-message",
      ref: "new-message",
      onChange: this.handleChange,
      value: this.state.text,
      className : "form-control"
    }),
    sendButton = React.createElement("div", {className:"input-group-append"}, 
      React.createElement("button",{ className : "btn btn-outline-primary"},"Enviar")),
    formContent = React.createElement("div", {className : "input-group"}, textareaMessage, sendButton);

    return React.createElement("div", { className : "messages col-lg-12" },
      React.createElement("div", { className : "card border-dark mb-3"},
        React.createElement("div",{ className : "card-header"},React.createElement("h3", { className : "card-title" }, "Chat")), // card-header
        React.createElement("div",{ className : "card-body"},
          React.createElement(MessageList, { items: this.state.items }),
          React.createElement("p", { className : "card-text text-muted" },createdMessage) // created
        ), // card-body
        React.createElement("div", {className : "message-input card-footer bg-transparent"},
          React.createElement("form", { onSubmit: this.handleSubmit, method : "POST" }, formContent) // form
        ) // card-footer
      ) // card
    ); // col-lg-12
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: new Date()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: '',
      created: new Date()
    }));
    this.createGist(newItem)
  }

  async createGist(message) {

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(message)
    }

    const request = new Request("/sendMessage", options);
    const response = await fetch(request);
    const status = await response.status;

    console.log(status)

  }
}

class MessageList extends React.Component {
  render() {
    return React.createElement(
      "ul",
      { className : "message-list"},
      this.props.items.map(item => React.createElement(
        "li",
        { key: item.id },
        item.text
        ))
      );
  }
}


const msgBoxDom = document.querySelector('#message_box_container');
ReactDOM.render(React.createElement(MessageBox, null), msgBoxDom);