class EmailSenderPaymentAggregatorMock
  attr_reader :sent, :template_sent

  def initialize(template)
    @template = template
    @template_sent = nil
    @sent = false
  end

  def apply_to(payment)
    @sent = true
    @template_sent = @template
  end
end