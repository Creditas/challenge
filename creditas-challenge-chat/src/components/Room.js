import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const Room = props => (
  <div>
    <ListItem
      button
      className={props.id === props.selectedRoomId ? 'selectedRoom' : ''}
      onClick={e=> {
        props.dispatch(props.id);
      }}
    >
      <ListItemText className="room-list-item" primary={props.name} style={{padding: '0', textAlign: 'center'}}/>
    </ListItem>
    <Divider light />
  </div>
);

Room.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedRoomId: PropTypes.number.isRequired
};

export default Room;
