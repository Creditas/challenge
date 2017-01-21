require('pubsub-js');

import { controller } from '../src/js/controller';
import { resource } from '../src/js/resource';
import { view } from '../src/js/view';

describe('controller', () => {
  describe('#submitMessage()', () => {
    const message = {
      user: {
        text: 'test',
        name: 'test'
      }
    };

    it('should call resource and view methods with correct message', () => {
      const resourceSpy = spyOn(resource, 'saveMessage');
      const viewSpy = spyOn(view, 'addMessage');

      controller.submitMessage({}, message);

      expect(resourceSpy).toHaveBeenCalledWith(message);
      expect(viewSpy).toHaveBeenCalledWith(message);
    });
  });

  describe('#submitMessages()', () => {
    const message = {
      user: {
        text: 'test',
        name: 'test'
      }
    };
    const messages = [message];

    it('should call view methods with correct message', () => {
      const viewSpy = spyOn(view, 'addMessage');

      controller.submitMessages({}, messages);

      expect(viewSpy).toHaveBeenCalledWith(message);
    });
  });
});
