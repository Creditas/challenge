module OrderItem
  class Factory
    def self.build(order:, product:, quantity: nil)
      item_class = OrderItem::Item
      item_class.new(order: order, product: product, quantity: quantity)
    end
  end
end
