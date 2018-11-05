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
    p "Send Digital Media Notification"
  end

  def build_email
  end
end