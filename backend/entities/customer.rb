class Customer
  attr_reader :membership, :vouchers

  def initialize
    @membership = nil
    @vouchers = nil
  end

  def activate_membership(order_details)
    @membership = true
    send_email_membership(order_details)
  end

  def notify_details(order_details)
    send_email_details(order_details)
  end

  def add_voucher(value)
    @vouchers = Voucher.new(value: value)
  end

  private
  def send_email_membership(order_details)
    EmailSender.send_email_membership(order_details)
  end

  def send_email_details(order_details)
    EmailSender.send_email_details(order_details)
  end
end
