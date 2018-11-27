import { combineReducers } from 'redux'
import messages from './messages'
import users from './users'
import rooms from './rooms'
import selectedRoomId from './selectedRoom'

const chat = combineReducers({
  messages,
  users,
  rooms,
  selectedRoomId
})

export default chat
