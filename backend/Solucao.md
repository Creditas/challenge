## Solução do Problema ##
A solução é baseada no conceito de ganchos para processamento dos pagamentos. Existem 2 tipos:
- antes do pagamento
- depois do pagamento.

O gancho **antes** é acionado no construtor da classe `Payment`:
```ruby
  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoice, @order = attributes.values_at(:invoice, :order)
    @payment_method = attributes.values_at(:payment_method)
    @order.prepare_payment
  end
```

o gancho **depois** é acionado no method `close` da class `Order`:
```ruby
  def close(closed_at = Time.now)
    @closed_at = closed_at
    @items.each do |item|
      item.product.actions.after_payment(item)
    end
  end

  def prepare_payment
    @items.each do |item|
      item.product.actions.before_payment(item)
    end
  end
```

O desacoplamento é feito utilizando uma composição de ações definida no método `actions` na class `Product`
```ruby
  def actions
    @actions ||= case @type
    when :physical
      PaymentActions.new([AddressShippingLabel.new])
    when :membership
      PaymentActions.new([
        ActiveMembership.new,
        EmailActiveMembership.new
      ])
    when :book
      PaymentActions.new([AddressShippingLabel.new('Isento de impostos.')])
    when :digital
      PaymentActions.new([
        EmailPayment.new,
        CreateVoucher.new(discount = 10)
      ])
    else
      PaymentActions.new([])
    end
  end
```
