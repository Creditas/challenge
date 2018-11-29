class Notification
  attr_reader :customer, :content

  def initialize(customer, content)
    @customer = customer
    @content = content
  end

  def send
    p "Sending e-mail..."
    p "Send To: #{customer.email}"
    p "Content: #{content}"
  end
end