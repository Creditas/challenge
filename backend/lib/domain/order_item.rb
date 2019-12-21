module Domain
  class OrderItem
    attr_reader :order, :product
    attr_accessor :shipping_label

    def initialize(order:, product:)
      @order = order
      @product = product
      @shipping_label = nil
    end

    def total
      @product.total
    end

    def discount_value
      @vouchers.sum(&:discount_value).to_f
    end
  end
end
