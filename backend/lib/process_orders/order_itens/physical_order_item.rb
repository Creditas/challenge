class PhysicalOrderItem < OrderItem 
  attr_reader :shipping_label

  def initialize(order, product, shipping_label)
    super(order, product)
    @shipping_label = shipping_label
  end

  def process
    super
    @shipping_label.send_physical_label
  end
end