import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Sender extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const { handleSendMessage, roomId } = this.props;
    const { message } = this.state;
    handleSendMessage(roomId, message);
  };

  handleMessageChange = event => {
    this.setState({
      message: event.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Mensagem...." onChange={this.handleMessageChange} />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

Sender.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired
};

export default Sender;
