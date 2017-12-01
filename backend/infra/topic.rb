class Topics
  attr_accessor :type

  def initialize(type)
    @type = type
  end

  PAID_INVOICE = new("Fatura Paga")
  PRODUCT_SOLD = new("Produto Vendido")
  MEMBERSHIP_ACTIVATED = new("Assinatura de Servico Ativada")
  DIGITAL_MEDIA_ACQUIRED = new("Compra de Midia Digital")

  class << self
    private :new
  end

end