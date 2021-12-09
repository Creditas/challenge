require 'spec_helper'

describe LoanMatcher do
  context 'when customer income is under 3000' do
    it 'returns personal loan' do
      customer = Customer.new(income: 2500)

      result = described_class.new(customer: customer).get_loans_from_customer

      expect(result.size).to eq 1
      expect(result).to include([Loan.new(type: 'PERSONAL_LOAN')])
    end
  end
end
