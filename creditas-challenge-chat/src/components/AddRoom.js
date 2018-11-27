import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const AddRoom = props => {
  return (
    <section id="new-room">
      <TextField
        id="new-room-input"
        label="New room name"
        margin="dense"
        style={{width: '100%', marginTop: '15px'}}
        onKeyPress={e => {
          if (e.key === "Enter") {
            props.dispatch(e.target.value);
            e.target.value = "";
          }
        }}
        type="text"
      />
    </section>
  );
};

AddRoom.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default AddRoom;
