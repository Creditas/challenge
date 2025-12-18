const MarsRover = require('./MarsRover');

describe('Mars Rover', () => {
  describe('Landing', () => {
    it('knows its landing position', () => {
      const rover = new MarsRover({
        position: {
          x: 1, y: 2
        }, orientation: 'N'
      });

      const where = rover.getPosition();

      expect(where).toEqual({
        position: {
          x: 1, y: 2
        }, orientation: 'N'
      });
    });
  });
});