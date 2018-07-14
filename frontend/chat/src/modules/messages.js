export const MESSAGE_SENT = 'app/message/MESSAGE_SENT';
export const ADD_MESSAGE = 'app/message/ADD_MESSAGE';
export const START_SENDING = 'app/message/START_SENDING';
export const SENDING_FAIL = 'app/message/SENDING_FAIL';
export const DONE_SENDING = 'app/message/DONE_SENDING';

export const send = (payload) => ({
  type: MESSAGE_SENT,
  payload
})

export const startSending = () => ({ type: START_SENDING })

export const onFail = () => ({ type: SENDING_FAIL })

export const doneSending = () => ({ type: DONE_SENDING })
