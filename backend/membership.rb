class Membership
  attr_reader :customer, :type

  def initialize(customer:, type:)
    @customer, @type = customer, type
  end

  def activate_customer_membership
    p "Assinatura de serviço para o comprador #{@customer.name} ativada"
  end
end
