require_relative '../bootstrap'

describe CreditCard do

  context 'fetch_by_hashed' do

   let(:code) { '545454' }
   subject(:creditCard) { described_class.fetch_by_hashed(code) }

   it 'with return a class instance' do
     expect(creditCard).to be_instance_of(described_class)
   end

  end
end

describe Product do

  context 'initialize' do

    let(:type) {'book'}
    subject(:product) { described_class.new(name: 'name', type: :type) }

    it 'when expect to have a name and a type' do
      expect{described_class.new()}.to raise_error(ArgumentError)
    end

    it 'with return a class instance' do
      expect(product).to be_instance_of(described_class)
    end

    it 'with correct product name' do
      expect(product.name).to eq('name')
    end

    it 'with correct product type' do
      expect(product.type).to eq(:type)
    end

    it 'with incorrect product type' do
      expect(product.type).not_to eq('foo')
    end

  end
end

describe Address do

  context 'initialize' do

    let(:zipcode) { '03136040' }
    subject(:address) { described_class.new(zipcode: :zipcode) }

    it 'when expect to have a zipcode in Address' do
      expect{described_class.new()}.to raise_error(ArgumentError)
    end

    it 'with return a class instance' do
      expect(address).to be_instance_of(described_class)
    end

    it 'with correct zipcode' do
      expect(address.zipcode).to eq(:zipcode)
    end

    it 'with incorrect zipcode' do
      expect(address.zipcode).not_to eq('07600000')
    end

  end
end

describe Invoice do

  context 'initialize' do

    let(:shipping_address) { 'Avenida 23 de maio' }
    let(:billing_address) { 'Ruda foo Bar' }

    subject(:order) { Order.new('Marco Antonio Sugamele') }
    subject(:invoice) do
     described_class.new(
       shipping_address: shipping_address,
       billing_address: billing_address,
       order: order
     )
    end

    it 'without parameters' do
    expect(Invoice.new()).to be_instance_of(described_class)
    end

    it 'with billing address' do
     expect(invoice.billing_address).to eq([billing_address])
    end

    it 'with shipping address' do
     expect(invoice.shipping_address).to eq([shipping_address])
    end

    it 'with order' do
     expect(invoice.order).to eq([order])
    end

  end
end

describe OrderItem do

  context 'initialize' do

    subject(:order) { Order.new('Marco Antonio Sugamele') }
    subject(:product) { Product.new(name: 'DDD', type: 'book')}
    subject(:item) { described_class.new(order: :order, product: :product) }

    it 'when expect to have a parameters' do
      expect{described_class.new()}.to raise_error(ArgumentError)
    end

    it 'with return a class instance' do
      expect(item).to be_instance_of(described_class)
    end

    it '#total' do
      expect(item.total).to eq(10)
    end

  end
end

describe Order do

    context 'initialize' do
      let(:zipcode) { '03136040' }
      let(:now) { Time.now }
      subject(:customer) { Customer.new }
      subject(:product) { Product.new(name: 'DDD', type: 'book')}
      subject(:address) { Address.new(zipcode: :zipcode) }

      it 'when expect to have a customer' do
        expect{described_class.new()}.to raise_error(ArgumentError)
      end

      it 'with instance customer' do
        order = Order.new(customer)
        expect(order.customer).to be_instance_of(Customer)
      end

      it 'with parameters store' do
        order = described_class.new( customer, address: address )
        expect(order.customer).to be_instance_of(Customer)
        expect(order.address).to be_instance_of(Address)
        expect(order.address.zipcode).to eq(:zipcode)
        expect(order.items).to eq([])
      end
    end

  context 'add_product' do

    it 'when we have not yet added products' do
      order = described_class.new(:customer)
      expect(order.items.size).to be 0
    end

    it 'when we have yet added products' do
      order = described_class.new(:customer)
      order.add_product(:product)
      expect(order.items.size).to be 1
    end

    it 'when we do not pass a product on add' do
      order = described_class.new(:customer)
      expect{order.add_product()}.to raise_error(ArgumentError)
    end

  end

  context 'total_amount' do

    it 'when we want to know the order total' do
      order = described_class.new(:customer)
      order.add_product(:product)
      expect(order.total_amount).to be 10
    end

  end

  context 'close' do

    it 'When we have not yet closed an order' do
      order = described_class.new(:customer)
      order.add_product(:product)
      expect(order.closed_at).to eq(nil)
    end

    it 'when we close an order' do
      order = described_class.new(:customer)
      order.add_product(:product)
      order.close(:now)
      expect(order.closed_at).to eq(:now)
    end
  end
end

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