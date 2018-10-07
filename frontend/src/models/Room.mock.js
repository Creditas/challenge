import User from './User';
import Message from './Message';
import Room from './Room';
import guid from '../helpers/guid';

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
  id: guid(),
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
