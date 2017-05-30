class BaseStrategy

  attr_reader :payment, :order, :customer, :mailer, :options, :order_item

  def initialize(order_item:, mailer: nil, options: {})
    @order_item = order_item
    @order = order_item.order
    @payment = order.payment
    @customer = order.customer
    @mailer = mailer
    @options = options

  end

  def execute
    raise NotImplementedError, "must implement 'execute' method"
  end

end
