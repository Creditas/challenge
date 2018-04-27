require_relative '../../src/domain/orders/order'
require_relative '../../src/domain/orders/order_item'
require_relative '../../src/domain/customers/customer'
require_relative '../../src/domain/products/product'

class OrderItemBuilder
  def initialize
    @order = Order.new(1, Customer.new(1, 'Dummy Name', 'dummy-email'))
  end

  def of_type(product_type)
    @product = Product.new(name: 'Dummy Name', type: product_type)
    self
  end

  def build
    OrderItem.new(order: @order, product: @product)
  end
end