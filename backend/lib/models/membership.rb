class Membership
  attr_reader :order, :product

  def initialize(order:, product:)
    @order = order
    @product = product
    @enabled = false
  end

  def enable!
    @enabled = true
  end

  def enabled?
    @enabled
  end
end
