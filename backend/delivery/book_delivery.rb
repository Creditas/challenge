require_relative 'shipping/shipping_label'

class BookDelivery

  def delivery(customer, product, shipping_address)
    @shipping_label = ShippingLabel.new(true)
    puts "O usuario #{customer} acaba de comprar um livro chamado #{product}. Sua label e '#{@shipping_label.info}'"
  end

  def notify(event)
    product = event.description
    customer = event.customer
    delivery(customer, product, event.shipping_address)
  end

end