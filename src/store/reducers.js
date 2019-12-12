import {combineReducers} from 'redux';

import auth from './auth/reducer';
import repository from './repository/reducer';
import commit from './commit/reducer';

export default () =>
  combineReducers({
    auth,
    repository,
    commit,
  });
