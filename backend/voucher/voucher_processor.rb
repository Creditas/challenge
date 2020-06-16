require_relative './voucher'

class VoucherProcessor

  def notify(event)
    puts "Adicionando voucher de R$10,00 para o usuario #{event.customer}"
    event.customer.add_voucher(Voucher.new)
  end

end