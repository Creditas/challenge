class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at, :pay_form

  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoice, @order = attributes.values_at(:invoice, :order)
    @payment_method = attributes.values_at(:payment_method)
  end

  def pay(paid_at = Time.now)
    @amount = order.total_amount
    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(billing_address: order.customer.address, shipping_address: order.customer.address, order: order)
   #esses if's não funcionam, serve apenas para mostrar qual seria a ideia para cada type uma chamada com atividades diferentes.
    
    #if(product.type == :physical)
    #  pay_physical
    #if(product.type == :book)
    #  pay_book
    #if(product.type == :digital)
    #  pay_digital
    #if(product.type == :signature)
    #  pay_signature
    @paid_at = paid_at
    order.close(@paid_at)
  end

  def pay_physical()
    @pay_form = PaymentPhysical.new(customer: order.customer)
    pay_form.pay_physical
  end

  def pay_book()
    @pay_form = PaymentBook.new(customer: order.customer)
    pay_form.pay_book
  end

  def pay_digital()
    @pay_form = PaymentDigital.new(order: order)
    pay_form.pay_digital
  end

  def pay_signature()
    @pay_form = PaymentSignature.new(customer: order.customer)
    pay_form.pay_signature

  end

  def paid?
    !paid_at.nil?
  end
end

