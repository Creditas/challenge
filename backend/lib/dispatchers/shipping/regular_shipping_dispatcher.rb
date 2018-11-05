class RegularShippingDispatcher < ShippingDispatcher
  attr_reader :shipping, :invoice

  def initialize
  end

  def get_shipping(invoice)
    @shipping = BookShipping.new(invoice)
    @invoice = invoice

    load_items

    shipping
  end

private

  def load_items
    invoice.order.items.each { |item| add_physical_product(item) }
  end

  def add_physical_product(item)
    if item.product.type == :book
      shipping.add_item(ShippingItem.new(item.product, item.quantity))
    end
  end
end