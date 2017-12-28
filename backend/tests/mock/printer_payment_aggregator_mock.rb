class PrinterPaymentAggregatorMock
  attr_accessor :printed, :printed_message

  def initialize(label_text)
    @label_text = label_text
    @printed = false
  end

  def apply_to(payment)
    @printed = true
    @printed_message = @label_text
  end
end