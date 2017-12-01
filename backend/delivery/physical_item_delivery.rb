require_relative 'shipping/shipping_label'

class PhysicalItemDelivery

  def delivery(customer, product, shipping_address)
    @shipping_label = ShippingLabel.new
    puts "O usuario #{customer} acaba de comprar um item fisico chamado #{product}. Sua label e '#{@shipping_label.info}'"
  end

  def notify(event)
    product = event.description
    customer = event.customer
    delivery(customer, product, event.shipping_address)
  end

end