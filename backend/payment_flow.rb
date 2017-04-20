require './bootstrap'
require './flows/flows'

class PaymentFlow
  attr_accessor :payment

  include Flows

  def initialize(payment)
    @payment = payment

    if @payment.paid?
      @payment.order.items.each do |item|
        self.send(item.product.type, @payment, item)
      end
    end
  end

  private

  def self.parametrize_module_name(str)
    str.split('_').map {|w| w.capitalize}.join
  end
end