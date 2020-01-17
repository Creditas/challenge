/* eslint no-undef: "error" */
/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import Provider from 'Provider';
import Calculate from './pages';
import store from './store';

import './reset.css';
import './colors.css';


const App = () => (
    <Provider store={store}>
        <Calculate />
    </Provider>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
