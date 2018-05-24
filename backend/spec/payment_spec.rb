require 'bootstrap'

describe Payment do
  it 'pagar pedido válido' do
    order = Order.new(Customer.new('paulo'))
    order.add_product(Products::Book.new('Awesome book'))
    order.add_product(Products::Physical.new('Pochete do Shersterson'))
    payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    expect(payment.paid?).to be(false)
    payment.pay
    expect(payment.paid?).to be(true)
  end

  it 'pagar usando voucher' do
    customer = Customer.new('paulo')
    customer.vouchers.add(Voucher.new(5))
    order = Order.new(customer)
    order.add_product(Products::Book.new('Awesome book'))
    payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    payment.pay

    expect(payment.paid?).to be(true)
    expect(payment.amount).to eq(5)
  end

  it 'pagar usando voucher com valor excedente' do
    customer = Customer.new('paulo')
    customer.vouchers.add(Voucher.new(15))
    order = Order.new(customer)
    order.add_product(Products::Book.new('Awesome book'))
    payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
    
    expect { payment.pay }.to raise_error(Exception)
    expect(payment.paid?).to be(false)
    expect(payment.amount).to eq(0)
  end

  it 'pagar pedido inválido' do
    order = Order.new(Customer.new('paulo'))
    payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    expect(payment.paid?).to be(false)
    expect { payment.pay }.to raise_error(Exception)
  end
end