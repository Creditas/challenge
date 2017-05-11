# Added gem for Shippo API(but is using invalid token and no params), just to give it a more realistic feel :)
require 'shippo'
require_relative 'shipping_helpers'

class Membership

  def self.shipping(object, order)
    ShippingHelpers.activate_membership(object.name, order.customer)
    ShippingHelpers.send_email(order.customer)
    return "Membership of #{object.name} was succesfully created and #{order.customer.name} received an email" if (ShippingHelpers.activate_membership(object.name, order.customer) && ShippingHelpers.send_email(order.customer))
    "There was an error activating the membership and/or notifying the customer"
  end

end

class Book

  def self.shipping(object, order)
    book_disclaimer = "notificação de que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
    ShippingHelpers.generate_shipping_label(object, book_disclaimer)
  end
end

class Physical

  def self.shipping(object, order)
    ShippingHelpers.generate_shipping_label(object)
  end

end

class Digital

  def self.shipping(object, order)
    ShippingHelpers.send_email(order.customer, 10)
    return "#{order.customer.name} received an email confirming payment and with $10 voucher" if (ShippingHelpers.send_email(order.customer))
    "There was an error notifying the customer via email"
  end
end
