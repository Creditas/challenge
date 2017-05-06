class PaymentActions
  def initialize(actions) 
    @actions = actions
  end

  def before_payment(order_item)
    @actions.each do |action|
      action.before_payment(order_item)
    end
  end

  def after_payment(order_item)
    @actions.each do |action|
      action.after_payment(order_item)
    end
  end
end
