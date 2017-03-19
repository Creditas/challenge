class Invoice
  attr_reader :billing_address, :shipping_address, :order, :type, :items

  def initialize(attributes = {})
    @billing_address = attributes[:billing_address]
    @shipping_address = attributes[:shipping_address]
    @order = attributes.fetch(:order)
    @type = self.class.name.gsub('Invoice', '').downcase.to_sym
    @items = @order.items_by_type(type)
  end

  def customer
    @order.customer
  end

  def process
    NotImplementedError.new('Must be implemented!')
  end
end
