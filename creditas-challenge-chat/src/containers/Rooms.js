import { connect } from 'react-redux'
import RoomsComponent from '../components/Rooms'
import { selectRoom } from '../actions'

const mapStateToProps = (state) => {
  return { rooms: state.rooms, selectedRoomId: state.selectedRoomId };
};

const mapDispatchToProps = dispatch => ({
  dispatch: (selectedRoomId) => {
    dispatch(selectRoom(selectedRoomId))
  }
}) 

export const Rooms = connect(mapStateToProps, mapDispatchToProps)(RoomsComponent)