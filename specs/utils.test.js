import { localStorageGet, localStorageSet } from '../src/js/utils';

describe('Utils', () => {
  describe('#localStorageGet()', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should return null when the key is not present', () => {
      expect(localStorageGet('test')).toBe(null);
    });

    it('should return parsed test value', () => {
      const value = { test: 'test' };
      const parsedValue = JSON.stringify(value);
      
      localStorage.setItem('test', parsedValue);
      
      expect(localStorageGet('test').test).toBe('test');
    });
  });

  describe('#localStorageSet()', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should parse and set test', () => {
      const value = { test: 'test' };
      const parsedValue = JSON.stringify(value);

      localStorageSet('test', value);

      expect(localStorage.getItem('test')).toBe(parsedValue);
    });
  });
});
