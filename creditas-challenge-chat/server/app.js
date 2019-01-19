const express = require('express')

const app = express()

const server = require('http').createServer(app)

const io = require('socket.io')(server)

const port = 8000

io.on('connection', socket => {
  socket.on('newMessage', newMessage => {
    socket.broadcast.emit('receivedMessage', newMessage)
  })
  socket.on('newRoom', newRoom => {
    socket.broadcast.emit('receivedRoom', newRoom)
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
