import User from './User';
import Message from './Message';

const MockedUSer = new User({
  name: 'Romulo Bordezani',
  role: 'dev'
});

const userId = MockedUSer.get().id;

const MockedMessage = new Message({
  content: 'One mocked message',
  userId
});

const RoomMock = [
  MockedMessage,
  MockedMessage,
  MockedMessage,
  MockedMessage,
  MockedMessage,
  MockedMessage,
  MockedMessage
];

export default RoomMock;
