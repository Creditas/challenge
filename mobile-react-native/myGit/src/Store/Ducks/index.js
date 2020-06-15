import { combineReducers } from 'redux';
import { reducer as user } from './user';
import { reducer as repository } from './repository';

export default combineReducers({
  user,
  repository,
});
