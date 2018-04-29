class PhysicalItem
  attr_reader :name, :value

  def initialize(name:, value:)
    @name = name
    @value = value
  end

  def ship(order)
    print_shipping_label(order.address.zipcode)
  end

  private

  def print_shipping_label(shipping_zipcode)
    shipping_zipcode + " label"
  end
end
