require 'rspec'
require_relative '../src/domain/membership'
require_relative '../src/domain/customer'
require_relative '../src/domain/payment_method'
require_relative '../src/domain/product'

product = Product.new(2, 'Otamatone from Maywa Denki', :physical, 45.00)
customer = Customer.new('foolano', 'foolano@github.io')

describe Membership, '#activate' do
  context 'with a active membership' do
    it 'still active' do
      membership = Membership.new(customer, product, true)
      membership.activate
      expect(membership.active?).to be(true)
    end
  end

  context 'with a inactive membership' do
    it 'does activate' do
      membership = Membership.new(customer, product, false)
      membership.activate
      expect(membership.active?).to be(true)
    end
  end
end

describe Membership, '#revoke' do
  context 'with a active membership' do
    it 'it does revoke' do
      membership = Membership.new(customer, product, true)
      membership.revoke
      expect(membership.active?).to be(false)
    end
  end

  context 'with a inactive membership' do
    it 'still inactive' do
      membership = Membership.new(customer, product, false)
      membership.revoke
      expect(membership.active?).to be(false)
    end
  end
end