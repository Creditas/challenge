class CommunicationRequest
  attr_reader :customer, :content

  def initialize(customer, content)
    @customer = customer
    @content = content
  end

  def type
    "ENVIO_EMAIL"
  end

end