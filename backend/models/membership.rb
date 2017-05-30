class Membership
  # you can customize this class by yourself
  attr_reader :customer, :status, :order_item

  def initialize(customer:, status:, order_item:)
    @customer = customer
    @status = status
    @order_item = order_item
  end

  def self.activate(customer:, order_item:)
    new(customer: customer, status: 'active', order_item: order_item)
  end
end
