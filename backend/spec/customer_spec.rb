require_relative '../payment'
require_relative '../customer'
require_relative '../product'
require_relative '../order'
require_relative '../order_item'
require_relative '../invoice'

describe Customer do
  before(:each) do
    @foolano = Customer.new
  end
end
