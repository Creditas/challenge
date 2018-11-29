class ShippingDispatcher
  def initialize
    raise 'This class should be inherited from, not instantiated.'
  end

  def dispatch(invoice)
    shipping = get_shipping(invoice)

    if shipping.items.length > 0
      shipping.ship
    end
  end

  def get_shipping(invoice)
    raise 'You must implement this.'
  end
end