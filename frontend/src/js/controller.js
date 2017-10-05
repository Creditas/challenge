import Messenger from './messenger'
import pubSub from 'pubsub-js'

const Controller = {
  sendMessage: (e) => {
    const target = e.target

    if (target.getAttribute('data-action')) {
      e.preventDefault()

      const input = e.path[1].childNodes[1]
      const action = target.getAttribute('data-action')
      let id = ''

      switch (action) {
        case 'start' :
          const messageList = e.path[3].childNodes[1]
          id = Messenger.chatInit(messageList)

          target.setAttribute('data-chat', id)
          target.setAttribute('data-action', 'send')

          Controller.__publishMessage(id, input)
          break
        case 'send' :
          id = target.getAttribute('data-chat')

          Controller.__publishMessage(id, input)
          break
      }
    }
  },

  __publishMessage: (id, input) => {
    pubSub.publish(id, input.value)
    input.value = input.defaultValue
  }
}

export default Controller
