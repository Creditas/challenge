require_relative '../../bootstrap.rb'

Before do
  @foolano = Customer.new(
    name: 'foolano',
    email: 'foolano@example.com',
    address: Address.new('45678-979'))
end
