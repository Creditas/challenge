import { ADD_ROOM, ADDED_ROOM, LOADING_ROOM } from '../constants/actionTypes';

const initialState = {
  list: [],
  errors: []
};

const room = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ROOM: {
      return {
        ...state,
        loading: true,
        errors: [],
        addedSuccessfully: false
      };
    }

    case ADD_ROOM: {
      return {
        ...state,
        loading: false,
        addedSuccessfully: false
      };
    }

    case ADDED_ROOM: {
      return {
        ...state,
        addedSuccessfully: true
      };
    }

    default: {
      return state;
    }
  }
};

export default room;
