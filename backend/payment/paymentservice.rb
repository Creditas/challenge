require_relative '../notification/notification.rb'
require_relative 'payment.rb'
require_relative 'paymenthandlers/paymenthandler.rb'

module PaymentModule

  class PaymentService

    attr_reader :payment
    
    def initialize(productOrder:, orderPayment_method: )
      @payment = Payment.new(order: productOrder, payment_method: orderPayment_method)
    end

    def process()
        puts "processamento pagamento"
        payment.order.items.each do |item|
            paymentHandler = PaymentHandler.new(item.product.type)
            paymentHandler.process(payment, item)
        end
        payment.pay
    end
  end

end