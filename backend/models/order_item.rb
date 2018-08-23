class OrderItem
  attr_reader :order, :product, :price, :shipping_label

  def initialize(order:, product:, price:)
    @order = order
    @product = product
    @price = price
  end

  def total
    @price
  end

  def shippable?
    product.shippable?
  end

  def process
    @shipping_label = generate_shipping_label if shippable?
    if product.type == :digital
      @order.customer.notify!(self, product.name)
      @order.customer.vouchers << Voucher.new(value: 10)
    end
  end

  private

  def generate_shipping_label
    label = "#{@order.customer.name}\nCEP: #{order.address.zipcode}"
    label += product.shipping_annotations if product.shipping_annotations
    label
  end
end
