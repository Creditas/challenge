import Chat from './chat';
import ChatFactory from './chatFactory';

describe('Chat ', () => {

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


        expect(room.chatView.id).toBeDefined();
        expect(document.getElementById(room.chatView.id)).not.toBeNull();

        room.createContainer('hellloooo', true);
        expect(sessionStorage.getItem('normal')).toMatch(/hellloooo/);
    });
});
