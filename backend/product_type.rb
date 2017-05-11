# Added gem for Shippo API(but is using invalid token and no params), just to give it a more realistic feel :)
require 'shippo'

class Membership
  def self.shipping(object)
    "MEMB"
  end
end

class Book
  def self.shipping(object)
    "BOOKS"
  end
end

class Physical
  def self.shipping(object)
    generate_shipping_label(object)
  end

  private
  def generate_shipping_label(object)
    Shippo::API.token = 'aff988f77afa0fdfdfadf'
    @shipment = Shippo::Shipment.create(params)
    return "Shipping Label for #{object.name} was succesfully created" if @shipment.success?
    "There was an error generating the shipping label for #{object.name}"
  end

end

class Digital
  def self.shipping(object)
  end
end
