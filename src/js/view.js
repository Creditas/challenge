require('pubsub-js');

import {
  getElement
} from './utils';
import { resource } from './resource';

const config = {};
const user = {};
const view = {
  init
}

export { view };

function init(viewConfig) {
  setConfig(viewConfig);
  setListeners();
}

function setListeners() {
  const sendButton = getElement(config.button);

  on(sendButton, 'click', publishMessage);
}

function setConfig(viewConfig) {
  Object.assign(config, viewConfig);
}