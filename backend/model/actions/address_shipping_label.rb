class AddressShippingLabel < Action
  
  def initialize(label = nil)
    @label = label
  end

  def after_payment(order_item)
    product_name = order_item.product.name
    client_name = order_item.order.customer.name
    zipcode = order_item.order.address.zipcode
    p "******* sending label to be printed:"
    if @label
      p "label: #{@label}."
    end
    p "client: #{client_name}."
    p "product: #{product_name}."
    p "zipcode: #{zipcode}"
  end

end
