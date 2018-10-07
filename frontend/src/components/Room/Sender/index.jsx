import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';

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
    handleSendMessage(roomId, message);
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
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={24}
          style={{ flexGrow: 1 }}
        >
          <Grid item xs={8} justify="center">
            <TextField
              required
              id="outlined-required"
              label="Mensagem"
              value={message}
              margin="dense"
              variant="outlined"
              autoComplete={false}
              onChange={this.handleMessageChange}
            />
          </Grid>
          <Grid item xs={4} justify="center">
            <Button type="submit" variant="contained" color="primary" size="small">
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

Sender.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired
};

export default Sender;
