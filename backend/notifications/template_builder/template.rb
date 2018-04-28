class Notifications::TemplateBuilder::Template
  def initialize(payment)
    @payment = payment
  end

  def build
    "book "
  end
end
