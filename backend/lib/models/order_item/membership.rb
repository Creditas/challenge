module OrderItem
  class Membership < Item
    def process
      membership = create_membership
      customer.add_membership(membership)
      membership.enable!
      send_email_notification
      super
    end

    private

    def create_membership
      ::Membership.new(order: order, product: product)
    end

    def customer
      order.customer
    end

    def send_email_notification
      notification = EmailNotification.new(
        customer: customer,
        subject: "Sua assinatura para #{product.name} foi ativada",
        body: "Tudo pronto!"
      )
      notification.send
    end
  end
end
