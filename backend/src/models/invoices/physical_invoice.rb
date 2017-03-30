require_relative './invoice'

class PhysicalInvoice < Invoice
  def initialize order:
    super
    generate_shipping_label
  end

  def generate_shipping_label
    puts "Gerei o 'shipping label' para o endereco #{order.shipping_address.zipcode}"
  end
end
