import {
    INITIAL_DATA,
    CHANGE_INPUT,
    CHANGE_GUARANTEE,
    SUBMIT,
} from './actions';


export default (state, action) => {
    switch (action.type) {
    case INITIAL_DATA:
        return { ...state, active: { ...state.active, ...action.payload } };
    case CHANGE_INPUT:
        return {
            ...state,
            active: {
                ...state.active,
                [action.payload.name]: action.payload.value,
            },
        };
    case CHANGE_GUARANTEE:
        return {
            ...state,
            active: {
                ...state.active,
                ...action.payload.guarantee,
                [action.payload.name]: action.payload.value,
            },
        };
    case SUBMIT:
        return {
            ...state,
            result: action.payload,
        };
    default: return state;
    }
};
