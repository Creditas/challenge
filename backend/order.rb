require_relative 'order_item'
require_relative 'address'
class Order
  attr_reader :customer, :items, :payment, :address, :closed_at

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
  end

  def add_product(product)
    @items << @order_item_class.new(order: self, product: product)
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

  def check_order_item(order_item)
      if @order_item.type == item_type.physical then
          self.generate_shipping_label()
      elsif @order_item == item.signature then
          self.activate_client_signature(@customer)
      elsif @order_item == item.type.common_book then
          self.generate_shipping_label(:item_free_of_charge)
      elsif @order_item == item.type.digital_midia then
          self.give_discount(10.00)
          self.send_email()
      end
  end

  # remember: you can create new methods inside those classes to help you create a better design
end
