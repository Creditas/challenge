class MembershipDispatcher
  attr_reader :memberships, :invoice

  def initialize
    @memberships = []
  end

  def dispatch(invoice)
    @invoice = invoice

    load

    activate
  end

  def send_email_on_activation(membership)
    Notification.new(invoice.customer, build_email).send
  end

private

  def load
    invoice.order.items.each { |item| add_membership_product(item) }
  end

  def add_membership_product(item)
    if item.product.type == :membership
      membership_product = MembershipProduct.new(item.product)
      membership = Membership.new(membership_product, invoice.customer, invoice)

      membership.add_observer(self, :send_email_on_activation)

      memberships << membership
    end
  end

  def activate
    memberships.each { |membership| membership.activate }
  end

  def build_email
    "--Email containing all membership products--"
  end
end