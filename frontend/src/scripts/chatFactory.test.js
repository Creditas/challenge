import ChatFactory from './chatFactory';
import Chat from './chat';
import ChatAjax from './chatAjax';

describe('ChatFactory ', () => {

beforeEach(() => {
    document.body.innerHTML =
        '<div class="messages">' +
        '</div>';
});

test('instanceof Chat', () => {
    let room = new ChatFactory({
        chatType: 'normal',
        placeholder: '.messages'
    });
    expect(room instanceof Chat).toBeTruthy();
});

test('instanceof ChatAjax', () => {
    let roomAjax = new ChatFactory({
        chatType: 'ajax',
        placeholder: '.messages'
    });

    expect(roomAjax instanceof ChatAjax).toBeTruthy();
});

});
