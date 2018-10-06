import { fork } from 'redux-saga/effects';
import rooms from './rooms';

export default function* root() {
  yield fork(rooms);
}
