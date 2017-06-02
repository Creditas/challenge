class Digital < Product
  def prepare(order=nil)
    send_email_to(order.customer)
    generate_discount_voucher_for(order.customer)
  end

  private

  def send_email_to(customer)
  end

  def generate_discount_voucher_for(customer)
  end
end