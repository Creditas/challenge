class OrderRepository
  def initialize
    @orders = []
  end

  def get_by(order_id)
    @orders.select { |order| order.id == order_id }.first
  end

  def add(order)
    @orders << order
  end
end