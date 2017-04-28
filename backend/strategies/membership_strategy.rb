class MembershipStrategy < BaseStrategy

  def initialize(order_item:, mailer: MembershipMailer.new, options: {})
    super(order_item: order_item, mailer: mailer, options: options)
  end

  def execute
    p "Membership Strategy"
    Membership.activate(customer: customer, order_item: order_item)
    mailer.send_email(order_item: order_item)
  end
end
