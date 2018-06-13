class DigitalOrderItem < OrderItem 
  attr_reader :mailer, :voucher

  def initialize(order, product, mailer, voucher)
    super(order, product)
    @mailer = mailer
    @voucher = voucher
  end

  def process
    super
    @mailer.send_mail(@order.customer.email)
    @voucher.notify(@order.customer.email)
  end
end