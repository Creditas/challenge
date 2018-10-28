class Payment
  # Permissão de leitura para essas variáveis
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at

  # Construtor da Classe, recebe objeto attributes
  def initialize(attributes = {})
    # seta authorization number e amount
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    # seta invoice e order
    @invoice, @order = attributes.values_at(:invoice, :order)
    # seta payment method
    @payment_method = attributes.values_at(:payment_method)
  end

  # Método pagar, recebe timestamp do pagamento 
  def pay(paid_at = Time.now)
    # pega o total do pedido
    @amount = order.total_amount
    # gera numero de autorização
    @authorization_number = Time.now.to_i
    # gera invoice com endereço de cobrança, endereço de entrega e pedido
    @invoice = Invoice.new(billing_address: order.address, shipping_address: order.address, order: order)
    # pega argumento e coloca na variavel paid_at
    @paid_at = paid_at
    # chamada para encerrar o pedido
    order.close(@paid_at)
  end

  # Método que informa se o pagamento está pago ou não
  def paid?
    !paid_at.nil?
  end
end