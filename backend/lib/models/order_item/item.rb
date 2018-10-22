module OrderItem
  class Item
    attr_reader :order, :product, :quantity

    def initialize(order:, product:, quantity: nil)
      @order = order
      @product = product
      @quantity = quantity || 1
      @processed = false
    end

    def total
      @quantity * @product.price
    end

    def process
      @processed = true
    end

    def processed?
      @processed
    end
  end
end
