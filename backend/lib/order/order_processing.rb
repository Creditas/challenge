class OrderProcessing
  attr_reader :order

  def initialize(order)
    @order = order
  end

  def process
    order.items.each do |item|
      puts item.process
    end
  end
end