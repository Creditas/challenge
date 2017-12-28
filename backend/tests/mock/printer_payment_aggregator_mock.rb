class PrinterPaymentAggregatorMock
  attr_accessor :printed, :printed_message

  def initialize(label_text)
    @label_text = label_text
  end

  def apply_to(payment)
    @printed = true
    printed_message = printed_message
  end
end