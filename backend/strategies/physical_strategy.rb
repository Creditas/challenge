class PhysicalStrategy < BaseStrategy

  def execute
    p "Physical Strategy"
    ShippingLabel.new(order_item: order_item, label: shipping_label)
  end

  protected

  def shipping_label
    "#{@customer.name}\n\
     #{@order.address}"
  end
end
