export interface RoomProps {
  id: string;
  name: string;
  messages: Array<MessageProps>;
}

export interface StyledRoomProps {
  active: boolean;
}

export interface MessageProps {
  id: string;
  username: string;
  message: string;
}
