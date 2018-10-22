module OrderItem
  class Factory
    def self.build(order:, product:, quantity: nil)
      item_class = map_product_to_item(product)
      item_class.new(order: order, product: product, quantity: quantity)
    end

    def self.map_product_to_item(product)
      if product.is_a?(Product::PhysicalProduct)
        OrderItem::PhysicalItem
      else
        raise "#{product.class} is not mapped to an Order Item class"
      end
    end

    private_class_method :map_product_to_item
  end
end
