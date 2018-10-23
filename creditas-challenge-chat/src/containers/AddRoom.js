import { connect } from 'react-redux'
import AddRoomComponent from '../components/AddRoom'
import { addRoom } from '../actions'

const mapDispatchToProps = dispatch => ({
  dispatch: (name) => {
    dispatch(addRoom(name))
  }
})

export const AddRoom = connect(() => ({}), mapDispatchToProps)(AddRoomComponent)
