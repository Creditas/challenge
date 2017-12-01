class PaymentMethod
  attr_accessor :billing_address, :payment_type

  def initialize(payment_type, billing_address)
    @payment_type = payment_type
    @billing_address = billing_address
  end

  def pay(order, vouchers = nil)
    if vouchers == nil 
      puts "Usuario #{order.customer} efetuando pagamento da order #{order} no valor de #{order.total_amount}"
    else
      discount = vouchers.map(&:discount).inject(:+)
      value = order.total_amount - discount
      puts "Usuario #{order.customer} efetuando pagamento da order #{order} no valor de #{value} devido aos vouchers de desconto"
    end
  end

end