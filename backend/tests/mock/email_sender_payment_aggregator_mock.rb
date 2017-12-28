class EmailSenderPaymentAggregatorMock
  attr_reader :sent, :template_sent

  def initialize(template)
    @template = template
  end

  def apply_to(payment)
    @sent = true
    @template_sent = @template
  end
end