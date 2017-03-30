class Payment
  attr_reader :authorization_number,
              :amount,
              :invoices,
              :order,
              :payment_method,
              :paid_at

  def initialize order:, payment_method:
    @order = order
    @payment_method = payment_method
  end

  def pay! paid_at
    @amount = order.total_amount
    @authorization_number = payment_method.pay!
    @paid_at = paid_at
    @invoices = @order.items_by_type.map do |group, items|
      type = group.to_s
      require_relative "./invoices/#{type}_invoice"
      invoice_klass = Object.const_get "#{type.capitalize}Invoice"
      invoice_klass.new order: @order
    end
  end

  def paid?
    !paid_at.nil?
  end
end
