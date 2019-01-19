import React, { Component, ChangeEvent, FormEvent } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Sidebar from './components/Sidebar'
import Messages from './components/Messages'
import Input from './components/Input'
import { RoomProps, MessageProps } from './shared/types'
import io from 'socket.io-client'
import newMessageSong from './assets/new-message.mp3'

const socket = io('http://localhost:8000')

const GlobalStyles = createGlobalStyle`

  body {
    @import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto');

    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
  }
`

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
  background: #20232a;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`

const Main = styled.div`
  flex-grow: 2;
  flex-direction: column;
  display: flex;
`

const FormUserName = styled.form`
  display: flex;
  flex: 0 0 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const FormNewMessage = styled.form`
  flex-direction: row;
  display: flex;
  height: 48px;
`

const JoinChat = styled.button`
  background: #61dafb;
  color: #fff;
  border: none;
  margin-top: 10px;
  height: 50px;
  width: 321px;
  font-size: 0.9rem;

  :focus {
    outline-width: 0;
  }
`

const SendMessage = styled.button`
  border: none;
  color: #20232a;
  font-weight: bold;

  :hover {
    color: #61dafb;
  }

  :focus {
    outline-width: 0;
  }
`

interface ReceivedMessageFromSocket {
  message: MessageProps
  room: RoomProps
  rooms: RoomProps[]
  roomIndex: number
}

class App extends Component {
  state = {
    rooms: [
      {
        id: '1547861671716',
        name: 'Geral',
        messages: [],
      },
      {
        id: '1547861683027',
        name: 'Desenvolvimento',
        messages: [],
      },
    ],
    roomName: '',
    selectedRoomIndex: 0,
    message: '',
    username: '',
    hasUsername: false,
  }

  componentDidMount() {
    this.initSocket()
  }

  initSocket = () => {
    socket.on(
      'receivedMessage',
      (receivedMessage: ReceivedMessageFromSocket) => {
        const rooms: RoomProps[] = this.state.rooms

        this.addNewMessage(
          receivedMessage.message,
          rooms,
          receivedMessage.room,
          receivedMessage.roomIndex
        )

        this.playReceivedMessageSong()
      }
    )

    socket.on('receivedRoom', (newRoom: RoomProps) => {
      this.addNewRoom(newRoom)
    })
  }

  playReceivedMessageSong = () => {
    const audio = new Audio(newMessageSong)
    return audio.play()
  }

  onChangeRoom = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ roomName: event.target.value })
  }

  onRoomSubmit = (event: FormEvent) => {
    event.preventDefault()

    const newRoom = {
      id: Date.now().toString(),
      name: this.state.roomName,
      messages: [],
    }

    if (!!this.state.roomName) {
      this.addNewRoom(newRoom)
      socket.emit('newRoom', newRoom)
    }
  }

  addNewRoom = (newRoom: RoomProps) => {
    this.setState({
      roomName: '',
      rooms: [...this.state.rooms, newRoom],
    })
  }

  selectRoom = (roomIndex: number) => {
    this.setState({ selectedRoomIndex: roomIndex })
  }

  onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: event.target.value })
  }

  onSubmitUsername = (event: FormEvent) => {
    event.preventDefault()

    if (this.state.username) {
      this.setState({ hasUsername: true })

      socket.emit('username', {
        user: {
          username: this.state.username,
          rooms: this.state.rooms,
        },
      })
    }
  }

  onSubmitMessage = (event: FormEvent) => {
    event.preventDefault()
    if (this.state.message) {
      const rooms: RoomProps[] = this.state.rooms
      const room: RoomProps = this.state.rooms[this.state.selectedRoomIndex]
      const roomIndex: number = this.state.selectedRoomIndex

      const message = {
        id: Date.now().toString(),
        username: this.state.username,
        message: this.state.message,
      }

      this.addNewMessage(message, rooms, room, roomIndex)

      socket.emit('newMessage', { message, room, roomIndex })
    }
  }

  onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value })
  }

  addNewMessage = (
    messageContent: MessageProps,
    rooms: RoomProps[],
    room: RoomProps,
    selectedRoomIndex: number
  ) => {
    this.setState({
      rooms: [
        ...rooms.slice(0, selectedRoomIndex),

        {
          ...room,
          messages: [...room.messages, messageContent],
        },
        ...rooms.slice(selectedRoomIndex + 1),
      ],
      message: '',
    })
  }

  componentWillUnmount() {
    socket.off('receivedMessage', this.addNewMessage)
    socket.off('receivedRoom', this.addNewRoom)
  }

  render() {
    return (
      <>
        <GlobalStyles />

        {this.state.hasUsername ? (
          <Container>
            <Sidebar
              roomName={this.state.roomName}
              onChange={this.onChangeRoom}
              onSubmit={this.onRoomSubmit}
              rooms={this.state.rooms}
              selectRoom={this.selectRoom}
              selectedRoomIndex={this.state.selectedRoomIndex}
            />
            <Main>
              <Messages
                rooms={this.state.rooms}
                selectedRoomIndex={this.state.selectedRoomIndex}
              />
              <FormNewMessage onSubmit={this.onSubmitMessage}>
                <Input
                  value={this.state.message}
                  onChange={this.onChangeMessage}
                  width={'100%'}
                  placeholder="Digite sua mensagem"
                />
                <SendMessage type="submit">Enviar</SendMessage>
              </FormNewMessage>
            </Main>
          </Container>
        ) : (
          <Container>
            <FormUserName onSubmit={this.onSubmitUsername}>
              <Input
                placeholder="Insira o seu nome"
                width={'300px'}
                onChange={this.onChangeUsername}
              />
              <JoinChat type="submit">Entrar no chat</JoinChat>
            </FormUserName>
          </Container>
        )}
      </>
    )
  }
}

export default App
