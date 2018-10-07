import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Sender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { handleSendMessage, roomId } = this.props;
    const { message } = this.state;
    handleSendMessage(roomId, message); // TODO add validation to prevent empty submission
    this.setState({
      message: ''
    });
  };

  handleMessageChange = event => {
    this.setState({
      message: event.target.value
    });
  };

  render() {
    const { message } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Mensagem...."
          value={message}
          onChange={this.handleMessageChange}
        />
        <button type="submit">
          Enviar
          {/* TODO add 118n */}
        </button>
      </form>
    );
  }
}

Sender.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired
};

export default Sender;
