// /* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './index';
import combinedReducers from '../../reducers/index';

describe('[App]', () => {
  let store;

  beforeEach(() => {
    store = createStore(combinedReducers);
    store.dispatch = jest.fn();
  });

  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App store={store} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
