module OrderItemFactory

  attr_reader :order, :product

  def self.create(order:, product:)
    @order, @product = order, product
    return send(@product.type.to_s)
  end

  def self.digital
    return DigitalOrderItem.new(order: @order, product: @product)
  end

  def self.membership
    return MembershipOrderItem.new(order: @order, product: @product)
  end

  def self.book
    return TaxFreeOrderItem.new(order: @order, product: @product)
  end

  def self.physical
    return OrderItem.new(order: @order, product: @product)
  end

end