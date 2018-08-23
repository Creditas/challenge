class EmailNotification
  attr_reader :customer, :to_address, :order_item, :body

  def initialize(customer:, to_address:, order_item:, body:)
    @customer = customer
    @to_address = to_address
    @order_item = order_item
    @body = body
  end

end
