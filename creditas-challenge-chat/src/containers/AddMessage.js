import { connect } from 'react-redux'
import AddMessageComponent from '../components/AddMessage'
import { addMessage } from '../actions'

const mapDispatchToProps = dispatch => ({
  dispatch: (message, author, room_id) => {
    dispatch(addMessage(message, author, room_id))
  }
})

const mapStateToProps = (state) => {
  return { selectedRoomId: state.selectedRoomId };
};

export const AddMessage = connect(mapStateToProps, mapDispatchToProps)(AddMessageComponent)
