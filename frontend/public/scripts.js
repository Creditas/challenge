$(() => {
  // Variables
  let socket = io('http://localhost:3000')

  function renderMessage(message) {
    var messageItem = "<li class='messageItem itemSecondary'><strong class='username'>" + message.username + ': </strong>' + message.message + ' <time>' + getCurrentDate() + '</time></li>'
    $('.messageList').append(messageItem)
  }

  function addNewUser(data) {
    var userItem = "<li class='info'>" + data.username + ' joined the conversation.'
    $('.messageList').append(userItem)
  }
  
  function getCurrentDate() {
    var currentDate = new Date()
    var day = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate()
    var month = ((currentDate.getMonth() + 1) < 10 ? '0' : '') + (currentDate.getMonth() + 1)
    var year = currentDate.getFullYear()
    var hour = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours()
    var minute = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()
    return day + "/" + month + "/" + year + " " + hour + ":" + minute
  }

  $('.formUsername').submit((e) => {
    e.preventDefault()

    var username = $('.inputUsername').val()
    var usernameArea = $('.usernameArea')
    var messageArea = $('.messageArea')

    if (username.length) {
      var usernameObject = {
        username: username,
      }
    }
    if (usernameObject) {
      usernameArea.hide()
      messageArea.show()
    }

    addNewUser(usernameObject)
  
    socket.emit('addNewUser', usernameObject)
    socket.emit('user joined', usernameObject)
  })

  $('.formMessage').submit((e) => {
    e.preventDefault()

    var username = $('.inputUsername').val()
    var message = $('.inputMessage').val()

    if (username.length && message.length) {
      var messageObject = {
        username: username,
        message: message
      }
    }
    renderMessage(messageObject)
  
    socket.emit('sendMessages', messageObject)
  })

  socket.on('receivedMessage', message => {
    renderMessage(message)
  })

  socket.on('previousMessages', messages => {
    for (message of messages) {
      renderMessage(message)
    }
  })

  socket.on('userJoined', data => {
    addNewUser(data)
  })
})