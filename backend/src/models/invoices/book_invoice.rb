require_relative './invoice'

class BookInvoice < Invoice
  def initialize order:
    super
    generate_shipping_label
    send_notification
  end

  def generate_shipping_label
    puts "Gerei o 'shipping label' para o endereco #{order.shipping_address.zipcode}"
  end

  def send_notification
    puts "Notifquei de insencao de impostos no email #{order.customer.email}"
  end
end
