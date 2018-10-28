class Invoice
  # Permissão de leitura para essas variáveis
  attr_reader :billing_address, :shipping_address, :order
    
  # Construtor
  def initialize(attributes = {})
    # seta billing address
    @billing_address = attributes.values_at(:billing_address)
    # seta shipping address
    @shipping_address = attributes.values_at(:shipping_address)
    # seta order
    @order = attributes.values_at(:order)
  end
end