import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import AppContext from './context';
import reducer from './reducer';

const Provider = ({ children, store }) => {
    const [state, dispatch] = useReducer(reducer, store);
    const value = { state, dispatch };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

Provider.propTypes = {
    children: PropTypes.element.isRequired,
    store: PropTypes.shape({}).isRequired,
};

export default Provider;
