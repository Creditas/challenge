import { combineReducers } from 'redux'
import chatlog from './chatlog'
import username from './username'

export default combineReducers({
	chatlog,
	username
})
