module Common

  def create(sym, overrides = {})
    send("#{sym.to_s}", **overrides)
  end

  def customer(overrides = {})
    Customer.new({email: 'email@example.com', name: 'Foolano', addresses: [address]}.merge(overrides))
  end

  def address
    Address.new(zipcode: '00100-010')
  end

  def payment(attributes: {}, overrides: {})
    Payment.new(attributes.merge(overrides))
  end

  def order(customer: self.customer, overrides: {})
    Order.new(customer, overrides)
  end

  def order_item(order: self.order, product: self.product(:physical), overrides: {})
    OrderItem.new({ order: order, product: product }.merge(overrides))
  end

  def product(type, overrides = {})
    Product.new({ name: type.to_s.capitalize, type: type }.merge(overrides))
  end

end
