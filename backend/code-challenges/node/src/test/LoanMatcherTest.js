const Customer = require('../main/customer');
const loanMatcher = require('../main/loanMatcher');
const assert = require('assert');

describe('Challenge Test', () => {
  it('should return 1 loan with type PERSONAL_LOAN', () => {
    const customer = new Customer(3000);
    const availableLoans = loanMatcher.loans(customer);
    assert.equal(availableLoans.length, 1);
    assert.equal(availableLoans[0].type, 'PERSONAL_LOAN');
  });
});
