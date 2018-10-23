import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

const AddMessage = props => {
  let input

  return (
    <section id="new-message">
      <TextField
        id="new-message-input"
        label="Your message here!"
        className={props.classes.textField}
        margin="normal"
        variant="outlined"
        style={{ flexGrow: "1" }}
        onKeyPress={e => {
          if (e.key === "Enter") {
            props.dispatch(e.target.value, "Me", props.selectedRoomId);
            e.target.value = "";
          }
        }}
        onChange={e=> {
          input = e.target.value
        }}
        input={(node) => {
          input = node
        }}
        type="text"
      />

      <Button
        variant="fab"
        color="primary"
        aria-label="Send your message"
        className={props.classes.button}
        onClick={e => {
          props.dispatch(input, "Me", props.selectedRoomId);
        }}
      >
        <svg style={{ width: "24px", height: "24px" }}  viewBox="0 0 24 24">
            <path fill="#fff" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
        </svg>
        <Typography variant="srOnly">Send your message</Typography>
      </Button>
    </section>
  );
};

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedRoomId: PropTypes.number.isRequired
};

export default withStyles(styles)(AddMessage);
