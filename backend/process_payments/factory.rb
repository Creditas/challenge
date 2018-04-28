class ProcessPayments::Factory
  def self.create(payment)
    case payment.order.items.first.product.type
      when :physical
        ProcessPayments::Providers::PhysicalProcess.new(payment)
      when :membership
        ProcessPayments::Providers::MembershipProcess.new(payment)
      when :book
        ProcessPayments::Providers::BookProcess.new(payment)
      when :digital
        ProcessPayments::Providers::DigitalProcess.new(payment)
      else
        fail ArgumentError, "type not supported"
    end
  end
end
