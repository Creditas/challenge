class Checkout
  attr_reader :sales_rules_manager

  def initialize(sales_rules_manager)
    @sales_rules_manager = sales_rules_manager
  end

  def process(order:, payment_method:)
    Payment.new(
        order: sales_rules_manager.apply(order),
        payment_method: payment_method
    )
  end
end