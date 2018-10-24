class EmailNotification
  attr_reader :customer, :recipient, :body, :subject

  def initialize(customer:, subject:, body:)
    @customer = customer
    @recipient = customer.email
    @body = body
    @subject = subject
  end

  def send
    @customer.add_notification(self)
  end
end
