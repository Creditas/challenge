const Fizzbuzz = require('./Fizzbuzz');

describe('Fizzbuzz', () => {
  it('returns 1 when passing a 1', () => {
    const result = Fizzbuzz(1)

    expect(result).toBe('1');
  });
});