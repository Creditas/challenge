require_relative '../bootstrap'

describe 'Membership' do
    it 'knows customer address' do
        customer = Customer.new
        expect(Membership.new(customer).address).to be not_nil
    end
end