Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

describe Payment do
  let(:zipcode) { '03136040' }
  subject(:customer) { Customer.new }
  subject(:product) { Product.new(name: 'DDD', type: 'book')}
  subject(:order) { Order.new(:customer) }
  subject(:creditCard) { CreditCard.fetch_by_hashed('3574657844') }

  context 'pay' do

    it 'When payment has not yet been paid' do
      order.add_product(product)
      payment = Payment.new(order: order, payment_method: creditCard)
      expect(payment.paid?).to eq(false)
    end

    it 'when the payment was successful' do
      order.add_product(product)
      payment = Payment.new(order: order, payment_method: creditCard)
      payment.pay
      expect(payment.paid?).to eq(true)
    end

    it 'when we want to know the first item of the order' do
      order.add_product(product)
      payment = Payment.new(order: order, payment_method: creditCard)
      payment.pay
      expect(payment.order.items.first.product.type).to eq('book')
    end
  end
end