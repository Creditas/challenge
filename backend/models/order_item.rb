class AbstractOrderItem
  attr_reader :order, :product, :price, :shipping_label, :membership

  def self.build(order:, product:, price:)
    item_class = 
      if product.is_a?(PhysicalProduct)
        PhysicalOrderItem
      elsif product.is_a?(DigitalProduct)
        DigitalOrderItem
      elsif product.is_a?(SubscriptionProduct)
        SubscriptionOderItem
      else
        raise "Unknown product type #{product.class}" 
      end

    item_class.new(order: order, product: product, price: price)
  end

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

  def process(customer); end
end

class PhysicalOrderItem < AbstractOrderItem
  def process(customer)
    @shipping_label = generate_shipping_label(customer) if shippable?
  end

  private

  def generate_shipping_label(customer)
    label = "#{customer.name}\nCEP: #{order.address.zipcode}"
    label += product.shipping_annotations if product.shipping_annotations
    label
  end
end

class DigitalOrderItem < AbstractOrderItem
  def process(customer)
    customer.notify!(self, product.name)
    customer.vouchers << Voucher.new(value: 10)
  end
end

class SubscriptionOderItem < AbstractOrderItem
  def process(customer)
    @membership = Membership.new(customer: customer)
    @membership.activate!
    customer.notify!(self, product.name)
  end
end
