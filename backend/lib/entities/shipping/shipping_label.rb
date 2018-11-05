class ShippingLabel
  attr_reader :shipping_address, :customer, :note

  def initialize(shipping_address, customer, note = "")
    @shipping_address = shipping_address
    @customer = customer
    @note = note
  end

  def to_s
    # we could override this method in order to generate the Shipping Label that will be printed later
    "Shipping label: #{shipping_address.zipcode}, #{note}"
  end
end