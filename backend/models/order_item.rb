class OrderItem
  attr_reader :order, :product, :price, :shipping_label, :membership

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

  def process(customer)
    @shipping_label = generate_shipping_label(customer) if shippable?
    
    # TODO: this is not good yet
    if product.type == :digital
      customer.notify!(self, product.name)
      customer.vouchers << Voucher.new(value: 10)
    elsif product.type == :subscription
      @membership = Membership.new(customer: customer)
      @membership.activate!
      customer.notify!(self, product.name)
    end
  end

  private

  def generate_shipping_label(customer)
    label = "#{customer.name}\nCEP: #{order.address.zipcode}"
    label += product.shipping_annotations if product.shipping_annotations
    label
  end
end
