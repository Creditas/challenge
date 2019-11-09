import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import AppContext from './context';
import reducer from './reducer';
import initialState from './initialState';

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

Provider.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Provider;
