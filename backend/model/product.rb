class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type, :price

  def initialize(name:, type:, price:)
    @name, @type, @price = name, type, price
  end

  def actions
    @actions ||= case @type
    when :physical
      PaymentActions.new([AddressShippingLabel.new])
    when :membership
      PaymentActions.new([
        ActiveMembership.new,
        EmailActiveMembership.new
      ])
    when :book
      PaymentActions.new([AddressShippingLabel.new('Isento de impostos.')])
    when :digital
      PaymentActions.new([
        EmailPayment.new,
        CreateVoucher.new(discount = 10)
      ])
    else
      PaymentActions.new([])
    end
  end
end
