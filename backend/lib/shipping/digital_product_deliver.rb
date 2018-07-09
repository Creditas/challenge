require_relative 'deliver.rb'
require_relative 'notificable.rb'
require_relative '../desafio_backend.rb'

class DigitalProductDeliver < Deliver
  include Notificable

  def process
    Voucher.new(email: @customer.email, amount: 10)
    self.notification
  end

  def notification
    notification1 = super
    return notification1 + " You won a R$ 10 discount for the next order"
  end
end
