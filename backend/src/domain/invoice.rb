# An invoice is a request for payment that contains information necessary to remit payment
# to the issuer. Normally that would include the issuer's name, address,
# terms of payment and if necessary an account number.
# The invoice also is given a number - a unique key identifier with respect to the issuer.

class Invoice
  attr_reader :order, :billing_address

  def initialize(order, billing_address)
    @order = order
    @billing_address = billing_address
  end

  def pay(paid_at = Time.now)
    @paid_at = paid_at
  end

  def paid?
    @paid_at != nil
  end

  def total_price
    @order.items
        .map(&->(item) {item.product.price * item.amount})
        .inject(:+)
  end
end