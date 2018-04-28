
class Helpers::ShippingLabel
  include Singleton

  def generate(payment)
    fail ArgumentError, "invoice not created" if payment.invoice.nil?
    fail ArgumentError, "shipping_address should be value" if payment.invoice.shipping_address.nil?

    "Shipping label: #{payment.invoice.shipping_label}"
  end
end
