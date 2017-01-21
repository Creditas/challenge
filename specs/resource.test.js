require('pubsub-js');

import { resource } from '../src/js/resource';
import { localStorageGet, localStorageSet } from '../src/js/utils';

describe('resource', () => {
  describe('#retrieveMessages()', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should not publish event if empty', () => {
      const pubSupSpy = spyOn(PubSub, 'publish');

      resource.retrieveMessages();

      expect(pubSupSpy).not.toHaveBeenCalled();
    });

    it('should publish event if not empty', () => {
      const pubSupSpy = spyOn(PubSub, 'publish');
      const value = { test: 'test' };
      const parsedValue = JSON.stringify(value);

      localStorageSet('messages', value);
      resource.retrieveMessages();

      expect(pubSupSpy).toHaveBeenCalledWith('messages:received', value);
    });
  });

  describe('#saveMessage()', () => {
    beforeEach(() => {
      localStorage.clear();
      localStorage.setItem('messages', '[]');
    });

    it('should save message', () => {
      const pubSupSpy = spyOn(PubSub, 'publish');
      const value = { test: 'test' };

      resource.saveMessage(value);

      expect(localStorageGet('messages')).toEqual([value]);
    });
  });
});
