require("../sass/styles.scss");

import { app } from './app';

const config = {
  container: '.message-list',
  button: '#submit-button',
  textBox: '#message-field'
};
const user = {
  name: 'Enzo'
}

on(window, 'load', app.init.bind(this, config, user));