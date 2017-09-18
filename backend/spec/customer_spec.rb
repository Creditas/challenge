require 'rspec'
require 'require_all'
require_all 'lib'

RSpec.describe Customer, "#customer" do
  context "create customer" do
    it "name and email" do
      customer = Customer.new(name: 'Beltrano', email: 'beltrano.silva@creditas.com.br')
      expect(customer.name).to eq 'Beltrano'
      expect(customer.email).to eq 'beltrano.silva@creditas.com.br'
    end

    it "credits" do
      customer = Customer.new(name: 'Beltrano', email: 'beltrano.silva@creditas.com.br')
      customer.add_credit(10)
      customer.add_credit(5)

      expect(customer.credits).to eq 15
    end

    it "memberships" do
      customer = Customer.new(name: 'Beltrano', email: 'beltrano.silva@creditas.com.br')
    end
  end
end

