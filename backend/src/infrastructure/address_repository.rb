require_relative '../domain/address'

class AddressRepository
  def find_customer_addresses(customer)
    [Address.new(customer, '11730-000')]
  end
end