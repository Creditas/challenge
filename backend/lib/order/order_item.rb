class OrderItem
  attr_reader :order, :product

  def initialize(order:, product:)
    @order = order
    @product = product
  end

  def total
    product.price
  end

  def process
    puts "Processing order item from #{product.name}"
    self.pick
    self.create_invoice
    self.ship
    puts "\n"
  end

  def pick
    puts "Picking physical item(#{product.name})"
  end

  def create_invoice
    puts 'Invoice created! All taxes must be paid'
  end

  def ship
    puts Shipping.label(@order)
  end
end