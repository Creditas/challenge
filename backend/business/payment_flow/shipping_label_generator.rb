class ShippingLabelGenerator

  def create(order_details)
    if order_details.has_physical_items?
      ShippingLabel.new(kind: :ordinary)
    elsif order_details.has_books?
      ShippingLabel.new(kind: :is_isent)
    else
      nil
    end
  end
end
