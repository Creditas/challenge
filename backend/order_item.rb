class OrderItem
  attr_reader :order, :product, :total, :email

  def initialize(order:, product:)
    @order = order
    @product = product
    @total = 10
  end

  def generate_voucher_discount()
      if @product.type == :digital
        @total = 0
      end
  end

  def send_email()
      #TODO Need to develop this feature on a near future
      if @product.type == :digital
        @email = "The produc name: " + @product.name + " type: " + @product.type.to_s + " was acquired by " + @order.customer.to_s
      end
  end

end
