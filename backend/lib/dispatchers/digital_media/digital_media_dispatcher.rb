class DigitalMediaDispatcher
  attr_reader :digital_products, :invoice

  def initialize
    @digital_products = []
  end

  def dispatch(invoice)
    @invoice = invoice

    load

    send_email
  end

private

  def load
    invoice.order.items.each { |item| add_digital_product(item) }
  end

  def add_digital_product(item)
    if item.product.type == :membership
      digital_products << item.product
    end
  end

  def send_email
    Notification.new(invoice.customer, build_email).send
    VoucherNotification.new(invoice.customer, Voucher.new(10)).send
  end

  def build_email
    "--Email containing all digita media products--"
  end
end