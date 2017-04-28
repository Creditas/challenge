class DigitalStrategy < BaseStrategy

  def initialize(order_item:, mailer: DigitalMailer.new, options: {})
    super(order_item: order_item, mailer: mailer, options: options)
  end

  def execute
    p "Digital Strategy"
    mailer.send_email(order_item: order_item)
    Voucher.create(customer: customer, value: options.fetch(:voucher_value) { 10 })
  end

end
