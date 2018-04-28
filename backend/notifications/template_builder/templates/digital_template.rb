class Notifications::TemplateBuilder::Templates::DigitalTemplate < Notifications::TemplateBuilder::Template
  def initialize(payment)
    super payment
  end

  def build
    voucher = Helpers::Voucher.instance.create(:digital_payment)
    @payment.order.customer.add_voucher(voucher)
    "#{@payment.order.customer.name} o pedido #{@payment.authorization_number} no valor de #{@payment.amount} foi concluído e de quebra você ganhou um Cupom de desconto (#{voucher[:code]}) de #{voucher[:discount]} reais para novas compras."
  end
end
