Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

describe Order do


    let(:now) { Time.now }
    subject(:customer) { Customer.new(name:'Sugamele', email:'foo@bar.com.br') }
    subject(:product) { CommonBook.new(name: 'DDD')}


    context 'initialize' do
      let(:zipcode) { '03136040' }
      subject(:address) { Address.new(zipcode: zipcode) }

      it 'when expect to have a customer' do
        expect{described_class.new()}.to raise_error(ArgumentError)
      end

      it 'with instance customer' do
        order = described_class.new(customer)
        expect(order.customer).to be_instance_of(Customer)
      end

      it 'with parameters store' do
        order = described_class.new(customer, address: address )
        expect(order.customer).to be_instance_of(Customer)
        expect(order.address).to be_instance_of(Address)
        expect(order.address.zipcode).to eq(zipcode)
        expect(order.items).to eq([])
      end
    end

  context 'add_product' do

    it 'when we have not yet added products' do
      order = described_class.new(customer)
      expect(order.items.size).to be 0
    end

    it 'when we have yet added products' do
      order = described_class.new(customer)
      order.add_product(product)
      expect(order.items.size).to be 1
    end

    it 'when we do not pass a product on add' do
      order = described_class.new(customer)
      expect{order.add_product()}.to raise_error(ArgumentError)
    end

  end

  context 'total_amount' do

    it 'when we want to know the order total' do
      order = described_class.new(customer)
      order.add_product(product)
      expect(order.total_amount).to be 10
    end

  end

  context 'close' do

    it 'When we have not yet closed an order' do
      order = described_class.new(customer)
      order.add_product(product)
      expect(order.closed_at).to eq(nil)
    end

    it 'when we close an order' do
      order = described_class.new(customer)
      order.add_product(product)
      order.close(now)
      expect(order.closed_at).to eq(now)
    end

  end
end