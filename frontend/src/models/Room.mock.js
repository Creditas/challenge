import User from './User';
import Message from './Message';
import Room from './Room';

const MockedUSer = new User({
  name: 'Romulo Bordezani',
  role: 'dev'
});

const userId = MockedUSer.get().id;

const MockedMessage = {
  content: 'One mocked message',
  userId
};

const RoomMock = new Room({
  id: 883838383838,
  messages: [
    new Message(MockedMessage),
    new Message(MockedMessage),
    new Message(MockedMessage),
    new Message(MockedMessage),
    new Message(MockedMessage),
    new Message(MockedMessage),
    new Message(MockedMessage)
  ]
});

export default RoomMock;
