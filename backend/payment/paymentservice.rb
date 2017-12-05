require_relative '../notification/notification.rb'
require_relative 'payment.rb'
module PaymentModule

  class PaymentHandler 
    public
        attr_reader :productType 
      def self.new(productType)
            @productType = productType 
            
            puts "PaymentHandler.new"
            puts productType
            klass = case productType
                    when :book then BookPaymentHandler
                    when :physical then PhysicalPaymentHandler
                    when :digital then DigitalPaymentHandler
                    when :membership then MemberShipPaymentHandler  
                    end
            puts klass
            klass == self ? super() : klass.new(productType)
      end

      
      def process(payment, orderItem)
      end
  end

  class BookPaymentHandler < PaymentHandler

    def process(payment,orderItem)
      puts "book processing - " #+ productType

      shippingLabel = Shipping::FreeTaxShippingLabel.new 
      shippingLabel.generate_shipping_label(payment,orderItem)

    end

  end

  class PhysicalPaymentHandler < PaymentHandler
    def process(payment,orderItem)
      puts "physical processing - " 
      #- Se o pagamento for para um item físico, 
      #você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;

      shippingLabel = Shipping::DefaultShippingLabel.new 
      shippingLabel.generate_shipping_label(payment,orderItem)

    end
  end

  class DigitalPaymentHandler < PaymentHandler
    def process(payment,orderItem)
      puts "digital processing - " 
      #  - Caso o pagamento seja de alguma mídia digital (música, vídeo), 
      #além de enviar a descrição da compra por e-mail ao comprador, 
      #conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.
        @customer  = payment.order.customer
        
        notification = Notification::EmailNotification.new 
        message = "Hi , " + @customer.name
        notification.send_notification(to: @customer.email, subject:"Purchase Order was created", message: message ) 
        voucherCode = "1234" # new voucher code rule
        voucherValue = 10
        payment.addVoucher(voucherCode , voucherValue)
    end
  end

  class MemberShipPaymentHandler < PaymentHandler
    def process(payment,orderItem)
      puts "membership processing - " 
      #  - Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
        @customer  = payment.order.customer
        
        membership = Membership.new(name: @customer.name, email: @customer.email)
        membership.enable()

        notification = Notification::EmailNotification.new 
        message = "Hi , " + @customer.name
        notification.send_notification(to: @customer.email, subject:"Membership was enabled", message: message ) 
    end
  end

  class PaymentService

    attr_reader :payment

    #def initialize(payment:)
    #  @payment = payment
    #end
    
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