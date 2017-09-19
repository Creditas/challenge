class MembershipOrderItem < OrderItem

  attr_reader :membership

  def initialize(order:, product:)
    super
    @membership = Membership.new(name: product.name, price: product.price)
  end

  def pick
    @membership.enable
    puts "Signature #{product.name} enabled"
  end

  def ship
    puts "Sending e-mail to #{order.customer.email}"
  end
end