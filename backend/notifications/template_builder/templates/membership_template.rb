class Notifications::TemplateBuilder::Templates::MembershipTemplate < Notifications::TemplateBuilder::Template
  def initialize(payment)
    super payment
  end

  def build
    "Parabéns #{@payment.order.customer.name}, sua assinatura foi ativada!"
  end
end
