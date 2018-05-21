class ShippingLabel
  attr_reader :kind

  def initialize(attributes)
    @kind = attrs.values_at(:kind)
  end
end
