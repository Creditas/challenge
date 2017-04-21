module Flows::DigitalType
  def digital(payment, item)

    customer = payment.order.customer
    voucher = Voucher.new(10)

    customer.vouchers << voucher

    p '---Email Send:'
    p "Dear #{customer.name},"
    p "Your product #{item.product.name} has been successfully bought."
    p "You also won a voucher of $#{customer.vouchers.last.amount} for your next order."
  end

end