class Order
  attr_reader :customer, :items, :payment, :address, :closed_at

  def initialize(customer)
    @customer = customer
    @items = []
  end

  def add_product(product)
    process_item = ProcessOrderItem.new(self, product)
    item = process_item.item_by_product_type
    @items << item
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def process
    @items.map(&:process)
  end

  def close(closed_at = Time.now)  
    @closed_at = closed_at
  end
end