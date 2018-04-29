class Membership
  attr_reader :name, :customer, :value

  def initialize(name:, customer:, value:)
    @name, @customer, @value = name, customer, value
  end

  def activate_customer_membership
    p "Assinatura de serviço para o comprador #{@customer.name} ativada"
  end
end
