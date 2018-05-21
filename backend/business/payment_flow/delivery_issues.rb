class DeliveryIssues
  DEFAULT_VOUCHER_VALUE = 10

  def create(order_details)
    if order_details.has_membership?
      @customer.activate_membership(order_details)
    elsif order_details.has_digital?
      @customer.notify_details(order_details)
      @customer.add_voucher(DEFAULT_VOUCHER_VALUE)
    end
  end

  private
  def customer
    @customer =|| order_details.customer
  end
end
