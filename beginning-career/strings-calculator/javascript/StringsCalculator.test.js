const StringsCalculator = require('./StringsCalculator');

describe('StringsCalculator', () => {
  it('empty string return 0', () => {
    const stringsCalculator = new StringsCalculator();

    stringsCalculator.add('');

    const result = stringsCalculator.calculate();

    expect(result).toBe(0);
  });
});