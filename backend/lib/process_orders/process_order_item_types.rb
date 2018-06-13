class ProcessOrderItem
  attr_reader :order, :product, :order_itens

  def initialize(order, product)
    @product = product
    @order_itens = {
      'book' => BookOrderItem.new(order, product, ShippingLabel.new), 
      'digital' => DigitalOrderItem.new(order, product, Mailer.new, Voucher.new),
      'membership' => MembershipOrderItem.new(order, product, Membership.new, Mailer.new), 
      'physical' => PhysicalOrderItem.new(order, product, ShippingLabel.new)    
    }
  end

  def item_by_product_type
    @order_itens[@product.type]
  end
end