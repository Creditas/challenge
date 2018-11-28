import { combineReducers } from 'redux'
import rooms from './room'
import username from './username'

export default combineReducers({
	rooms,
	username
})
