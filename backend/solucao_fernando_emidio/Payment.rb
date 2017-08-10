#!/usr/bin/ruby -w

class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at, :shippingLabelGenerated, :taxesFree, :userNotificatedByEmail

  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoice, @order = attributes.values_at(:invoice, :order)
    @payment_method = attributes.values_at(:payment_method)
  end

  def pay(paid_at = Time.now)
    @amount = order.total_amount
    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(billing_address: order.address, shipping_address: order.address, order: order)
    @paid_at = paid_at
    order.close(@paid_at)
    specializedPayment()
  end
  
  def specializedPayment()
    raise NotImplementedError
  end
  
  def generateShippingLabel(textoAdicional =  "")
    puts "Shipping label gerado para a ordem do tipo #{@order.orderProductType[:type]}."  + textoAdicional
    @shippingLabelGenerated = true
  end
  
  def setTaxFree()
    @taxesFree = true  
  end
  
  def sendEmail(to, subject, message)
    puts "E-mail sent to #{to}. Subject: #{subject}. Message: "
    puts message
    
    @userNotificatedByEmail = true
  end
  
  def paid?
    !paid_at.nil?
  end
end

# use type to distinguish each kind of product: physical, book, digital, membership, etc.

class PaymentFactory    
  
  def self.createPaymentClass(order, paymentMethod, invoice_, authorizationNumber, amount_)
    object = nil
    case order.orderProductType
    when {:type=>:physical}      
      object = PaymentPhysical.new(order: order, payment_method:paymentMethod,invoice:invoice_,authorization_number: authorizationNumber, amount:amount_)
    when {:type=>:book}
      object = PaymentBook.new(order: order, payment_method:paymentMethod,invoice:invoice_,authorization_number: authorizationNumber, amount:amount_)
    when {:type=>:digital}
      object = PaymentDigital.new(order: order, payment_method:paymentMethod,invoice:invoice_,authorization_number: authorizationNumber, amount:amount_)        
    when {:type=>:membership}        
        object = PaymentMembership.new(order: order, payment_method:paymentMethod,invoice:invoice_,authorization_number: authorizationNumber, amount:amount_)        
    else
        raise 'Payment type is not valid or was no informed.'
    end
      
  end

end

class PaymentPhysical < Payment 
  
  def initialize(attributes = {})
    super
  end
  
  def specializedPayment()
    generateShippingLabel()    
  end  
  
end

class PaymentBook < Payment 
  
  def initialize(attributes = {})
    super
  end
    
  def specializedPayment()
    generateShippingLabel("This item is tax free.")
    setTaxFree()
  end  
  
end


class PaymentDigital < Payment
  attr_accessor :voucherValue
  
  def initialize(attributes = {})
    super
    @voucherValue = 0
  end
   
  def specializedPayment()
    sendEmail("destinatario@caritas.com.br", "Compra realizada na loja virtual.", "Seu pedido foi processado com sucesso...Você recebeu também um voucer de desconto de R$10,00")
    order.customer.setVoucher(voucherValue)        
  end  
end


class PaymentMembership < Payment 
  def specializedPayment()
    @order.customer.activateService()
    sendEmail("destinatario@caritas.com.br", "Ativicação de Assinatura.", "Sua assinatura foi ativada.")
  end  

end

