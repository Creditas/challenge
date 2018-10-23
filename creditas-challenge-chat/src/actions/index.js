import * as types from '../constants/ActionTypes'

let nextMessageId = 0
const nextUserId = 0
let nextRoomId = 3

export const addMessage = (message, author, room_id) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author,
  room_id
})

export const messageReceived = (message, author, room_id) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  author,
  room_id
})

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users
})

export const addRoom = (name) => ({
  type: types.ADD_ROOM,
  id: nextRoomId++,
  name
})

export const updateRooms = (name) => ({
  type: types.UPDATE_ROOMS,
  id: nextRoomId++,
  name
})

export const selectRoom = (selectedRoomId) => ({
  type: types.SELECT_ROOM,
  selectedRoomId
})