import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { Message } from './chat/Message';

describe('ChatService', () => {
  let msg;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatService]
    });

    msg = new Message(
      'test',
      new Date(),
      'client'
    );
  });

  it('should add new messages', inject([ChatService], (service: ChatService) => {
    service.cleanAll();
    service.addMessage(msg);

    expect( service.getAll()[0].getContent() ).toBe('test');
  }));

  it('should clean all chat messages', inject([ChatService], (service: ChatService) => {
    service.addMessage(msg);
    service.cleanAll();

    expect( service.getAll().length ).toBeFalsy();
  }));
});
