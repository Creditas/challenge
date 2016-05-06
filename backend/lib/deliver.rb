class Deliver
  def initialize(attributes = {})
    @product, @order = attributes.values_at(:product, :order)
  end

  def deliver_product
    print_shipping_label if @product.type.shipping_label
    send_discount if @product.type.send_discount?
    activate_subscription if @product.type.is_service?
  end

  private
    def print_shipping_label
      Labeler.print_shipping_label(@product.type.shipping_label)
    end

    def send_discount
      @order.customer.add_coupon('10')
      send_mail
    end

    def send_mail
      Mailer.send_mail(@product.type.mail_body)
    end

    def activate_subscription
      @order.customer.add_subscription(@product.name)
      send_mail
    end
end