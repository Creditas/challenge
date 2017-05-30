class CreateVoucher < Action
  def initialize(discount)
    @discount = discount
  end

  def before_payment(order_item)
    p "******* adding discount: #{@discount}"
    order_item.order.add_discount(@discount)
  end

end
