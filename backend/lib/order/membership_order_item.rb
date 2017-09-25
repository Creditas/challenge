class MembershipOrderItem < OrderItem

  attr_reader :membership

  def pick
    @membership = Membership.new(name: product.name, price: product.price)
    @membership.enable
    puts "Signature #{product.name} enabled"
  end

  def ship
    puts "Sending e-mail to #{order.customer.email}"
  end
end