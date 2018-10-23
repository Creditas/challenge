import React from 'react'
import PropTypes from 'prop-types'
import Room from './Room'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

const Rooms = props => (
  <section id="room-list">
    <Typography variant="overline" color="primary" gutterBottom>
        ALL ROOMS
    </Typography>
    <List component="nav">
      {props.rooms.map(room => (
          <Room
            key={room.id}
            {...room}
            dispatch={props.dispatch}
            selectedRoomId={props.selectedRoomId}
            
          />
      ))}
    </List>
  </section>
)

Rooms.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedRoomId: PropTypes.number.isRequired
}

export default Rooms
