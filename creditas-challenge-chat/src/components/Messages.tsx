import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { RoomProps, MessageProps } from '../shared/types'

const StyledMessages = styled.div`
  flex: 1;
  background: #f3f3f3;
  overflow-y: auto;
  overflow-x: hidden;
`

const Message = styled.div`
  width: 100%;
  margin: 15px 08px;
`

const MessageText = styled.div`
  background: #20232a;
  display: inline;
  padding: 4px 8px;
  color: #fff;
  border-radius: 8px;
  font-size: 0.9rem;
`

const MessageUsername = styled.div`
  color: #20232a;
  margin-bottom: 10px;
  font-size: 0.8rem;
`

interface MessagesProps {
  rooms: RoomProps[]
  selectedRoomIndex: number
}

const Messages: FunctionComponent<MessagesProps> = ({
  rooms,
  selectedRoomIndex,
}) => (
  <StyledMessages>
    {rooms[selectedRoomIndex]
      ? rooms[selectedRoomIndex].messages.map((message: MessageProps) => (
          <Message key={message.id}>
            <MessageUsername>{message.username}</MessageUsername>
            <MessageText>{message.message}</MessageText>
          </Message>
        ))
      : null}
  </StyledMessages>
)

export default Messages
