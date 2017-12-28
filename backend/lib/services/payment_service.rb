class PaymentService
  def initialize
  end

  def add_aggregator(aggregator:, product_type:, execute_before_payment: false)
    @before_aggregators = [] unless @before_aggregators
    @after_aggregators = [] unless @after_aggregators

    new_aggregator = {aggregator: aggregator, type: product_type}
    if execute_before_payment
      @before_aggregators.push(new_aggregator)
    else
      @after_aggregators.push(new_aggregator)
    end
  end

  def pay(payment, paid_at = Time.now)
    item_type = payment.order.itens_type
    PaymentService.apply_aggregators(@before_aggregators, payment)
    payment.pay
    PaymentService.apply_aggregators(@after_aggregators, payment) if payment.paid?
  end

  private
  def self.apply_aggregators(aggregators, payment)
    type = payment.order.itens_type
    aggregators_for_type = aggregators.select {|agg| agg[:type] == type}.map{ |agg| agg[:aggregator]} unless aggregators.nil?
    aggregators_for_type.each { |agg| agg.apply_to payment } unless aggregators_for_type.nil?
  end
end