'use strict';

var messageBox = require("./messageBox");
var messageList = new messageBox.MessageList;

class MenuBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return React.createElement(
      "div",
      { className : "messages card"},
      React.createElement(
        "h3",
        null,
        "Chat"
        ),
      React.createElement(messageList, { items: this.state.items }),
      React.createElement(
        "div",
        {className : "message-input"},
          React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement("input", {
          id: "new-message",
          onChange: this.handleChange,
          value: this.state.text
        }),
        React.createElement(
          "button",
          { className : "btn btn-primary"},
          "Enviar"
          )
        )
        ),
      );
  }

  handleChange(e) {
    // console.log(e.target.value)
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}


const menuBox = document.querySelector('#menu_box_container');
ReactDOM.render(React.createElement(MenuBox, null), menuBox);