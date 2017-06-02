'use strict';

import { createStore } from './store';
import { chatReducer } from './reducers';
import { uuidGenerator } from './utils';

import { components } from './components';

const initialState = [ {
  uuid: uuidGenerator(),
  messages: []
} ];

class ChatApp {
  constructor(store, components, rootElement) {
    this.store = store;
    this.components = components;
    this.elementRoot = rootElement;
  }

  run() {
    this.components.forEach( (component) => {
      new component(this.store).render(this.elementRoot);
    } );
  }
}

let store = createStore(chatReducer, initialState);
let rootElement = document.getElementById('root');

new ChatApp(store,components,rootElement).run();
