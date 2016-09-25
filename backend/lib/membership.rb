class Membership < Product
  def prepare(order=nil)
    signature_activate(order.customer)
    send_email_to(order.customer)
  end

  private

  def signature_activate(customer)
  end

  def send_email_to(customer)
  end
end