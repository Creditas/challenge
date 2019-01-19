import React, {
  FunctionComponent,
  ChangeEventHandler,
  FormEventHandler,
} from 'react'
import Input from './Input'
import styled from 'styled-components'
import { RoomProps, StyledRoomProps } from '../shared/types'

const StyledSidebar = styled.div`
  max-width: 300px;
  width: 100%;
  background: #20232a;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(31, 111, 255, 0.2);

  @media screen and (max-width: 500px) {
    max-width: 100%;
    flex: 0 0 300px;
  }
`

const Title = styled.h4`
  color: #626467;
  margin-left: 30px;
  font-size: 1rem;
`

const RoomsList = styled.div`
  margin-top: -10px;
  list-style: none;
  font-size: 0.9rem;
  color: #fff;
  flex-grow: 2;
`

const Room = styled.div<StyledRoomProps>`
  line-height: 35px;
  font-weight: ${props => (props.active ? '700' : '500')}
  border-bottom: ${props => (props.active ? '1px solid #61DAFB' : 'none')};
  color: ${props => (props.active ? '#61DAFB' : 'grey')};
  padding-left: 30px;

  :hover {
    cursor: pointer;
  }
`

const NewRoomForm = styled.form`
  flex-grow: 0;
  max-height: 50px;
  height: 100%;
  display: flex;
  flex-direction: row;
  background: #20232a;

  input {
    border: 0;
    width: 100%;
    padding-left: 20px;
    color: grey;
    font-size: 0.8rem;
    background: #20232a;
    font-weight: bold;
    height: 50px;

    &::-webkit-input-placeholder {
      color: grey;
      font-family: 'Montserrat';
    }

    :focus {
      outline-width: 0;
    }
  }

  button {
    background: #20232a;
    border: 0;
    color: #c1c1c1;
    font-size: 1.3rem;

    :hover {
      color: #61dafb;
    }

    :focus {
      outline-width: 0;
    }
  }

  @media screen and (max-width: 500px) {
    max-height: 30px;
  }
`

interface SidebarProps {
  roomName: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onSubmit: FormEventHandler
  rooms: RoomProps[]
  selectRoom: Function
  selectedRoomIndex: number
}

const Sidebar: FunctionComponent<SidebarProps> = ({
  roomName,
  onChange,
  onSubmit,
  rooms,
  selectRoom,
  selectedRoomIndex,
}) => (
  <StyledSidebar>
    <div>
      <Title>Salas</Title>
    </div>
    <RoomsList>
      {rooms.length === 0 ? (
        <p>Não há salas criadas</p>
      ) : (
        rooms.map((room: RoomProps, index: number) => (
          <Room
            key={room.id}
            onClick={() => selectRoom(index)}
            active={selectedRoomIndex === index}
          >
            {room.name}
          </Room>
        ))
      )}
    </RoomsList>
    <NewRoomForm onSubmit={onSubmit}>
      <Input
        value={roomName}
        onChange={onChange}
        width={'100%'}
        placeholder="Digite o nome da sala"
      />
      <button type="submit">+</button>
    </NewRoomForm>
  </StyledSidebar>
)

export default Sidebar
