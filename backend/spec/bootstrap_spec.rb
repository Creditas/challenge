require_relative '../bootstrap'

describe Address do
  context 'initialize' do
    subject(:subject) { described_class.new(zipcode: '00000-000') }

    it 'expect to have a zipcode' do
      expect{described_class.new()}.to raise_error(ArgumentError)
    end

    it 'stores zipcode' do
      expect(subject.zipcode).to eq('00000-000')
    end
  end
end

describe CreditCard do
  context 'fetch_by_hashed' do
    subject(:subject) { described_class.fetch_by_hashed(code) }

    let(:code) { 'anything' }

    it 'should return a class instance' do
      expect(subject).to be_instance_of(described_class)
    end
  end
end

describe Invoice do
  context 'initialize' do
    subject(:subject) do
      described_class.new(
        billing_address: billing_address,
        shipping_address: shipping_address,
        order: order
      )
    end

    let(:billing_address) { 'some address' }
    let(:shipping_address) { 'some other address' }
    let(:order) { 'some order' }

    it 'stores' do
      expect(subject.billing_address).to eq(['some address'])
      expect(subject.shipping_address).to eq(['some other address'])
      expect(subject.order).to eq(['some order'])
    end
  end
end

describe Product do
  context 'initialize' do
    subject(:subject) { described_class.new(name: 'name', type: :type) }

    it 'expect to have a name and a type' do
      expect{described_class.new()}.to raise_error(ArgumentError)
    end

    it 'stores name and type' do
      expect(subject.name).to eq('name')
      expect(subject.type).to eq(:type)
    end
  end
end

describe Order do
  context 'initialize' do
    it 'needs at least a customer' do
      expect{described_class.new()}.to raise_error(ArgumentError)
    end

    it 'stores attributes' do
      first_order = described_class.new(Customer.new('a@a.com'))
      second_order = described_class.new(
        Customer.new('b@b.com'),
        address: Address.new(zipcode: '00000-000')
      )

      expect(first_order.customer).to be_instance_of(Customer)
      expect(first_order.items).to eq([])
      expect(first_order.address).to be_instance_of(Address)
      expect(first_order.address.zipcode).to eq('45678-979')

      expect(second_order.customer).to be_instance_of(Customer)
      expect(second_order.items).to eq([])
      expect(second_order.address).to be_instance_of(Address)
      expect(second_order.address.zipcode).to eq('00000-000')
    end
  end

  context 'add_product' do
    it 'append product to order' do
      order = described_class.new(Customer.new('a@a.com'))

      expect(order.items.size).to be 0

      order.add_product(Product.new(name: 'product_name', type: :book))

      expect(order.items.size).to be 1
    end

    it 'expect product as parameter' do
      order = described_class.new(Customer.new('a@a.com'))

      expect(order.items.size).to be 0

      expect{order.add_product()}.to raise_error(ArgumentError)
    end
  end

  context 'total_amount' do
    it 'count total amount of products in order' do
      order = described_class.new(Customer.new('a@a.com'))
      order.add_product(Product.new(name: 'product_name', type: :book))

      expect(order.total_amount).to be 10
    end
  end

  context 'close' do
    it 'closes a order' do
      order = described_class.new(Customer.new('a@a.com'))
      order.add_product(Product.new(name: 'product_name', type: :book))

      expect(order.closed_at).to eq(nil)

      now = Time.now
      order.close(now)

      expect(order.closed_at).to eq(now)
    end
  end

  context 'deliver' do
    it 'ships book' do
      order = described_class.new(Customer.new('a@a.com'))
      order.add_product(Product.new(name: 'product_name', type: :book))

      allow(Ship).to receive(:book)
      order.deliver

      expect(Ship).to have_received(:book)
    end

    it 'ships membership' do
      order = described_class.new(Customer.new('a@a.com'))
      order.add_product(Membership.new(
        name: 'product_name'
      ))

      allow(Ship).to receive(:membership)
      order.deliver

      expect(Ship).to have_received(:membership).with(order.items[0])
    end

    it 'ships physical' do
      order = described_class.new(Customer.new('a@a.com'))
      order.add_product(Product.new(name: 'product_name', type: :physical))

      allow(Ship).to receive(:physical)
      order.deliver

      expect(Ship).to have_received(:physical).with(order.items[0])
    end

    it 'ships digital' do
      order = described_class.new(Customer.new('a@a.com'))
      order.add_product(Product.new(name: 'product_name', type: :digital))

      allow(Ship).to receive(:digital)
      order.deliver

      expect(Ship).to have_received(:digital).with(order.items[0])
    end
  end
end

describe Ship do
  context 'book' do
    it 'expect to call shipping label for tax free' do
      allow(Print).to receive(:shipping_label_tax_free)

      order = Order.new(Customer.new('a@a.com'))
      order.add_product(Product.new(name: 'product_name', type: :book))
      order.add_product(Product.new(name: 'product_name', type: :digital))

      item = order.items[0]

      order.deliver

      expect(Print).to have_received(:shipping_label_tax_free)
        .with(order.address, item.product)
    end
  end

  context 'physical' do
    it 'expect to call shipping label' do
      allow(Print).to receive(:shipping_label)

      order = Order.new(Customer.new('a@a.com'))
      order.add_product(Product.new(name: 'product_name', type: :book))
      order.add_product(Product.new(name: 'product_name', type: :physical))

      item = order.items[1]

      order.deliver

      expect(Print).to have_received(:shipping_label)
        .with(order.address, item.product)
    end
  end

  context 'membership' do
    it 'expect to activate membership' do
      order = Order.new(Customer.new('a@a.com'))
      order.add_product(Product.new(name: 'product_name', type: :book))
      order.add_product(Product.new(name: 'product_name', type: :physical))

      membership = Membership.new(name: 'product_name')
      order.add_product(membership)

      expect{ order.deliver }.to change{ membership.active }.from(false).to(true)
    end

    it 'expect to send email notification' do
      allow(Notification).to receive(:membership_activated)

      customer = Customer.new('a@a.com')
      order = Order.new(customer)
      order.add_product(Product.new(name: 'product_name', type: :book))
      order.add_product(Product.new(name: 'product_name', type: :physical))

      membership = Membership.new(name: 'product_name')
      order.add_product(membership)

      order.deliver

      expect(Notification).to have_received(:membership_activated).with(membership, customer.email)
    end
  end

  context 'digital' do
    let(:customer){ Customer.new('a@a.com')}
    let(:order) {Order.new(customer)}

    before do
      allow(Notification).to receive(:digital_purchase)

      order.add_product(Product.new(name: 'product_name', type: :book))
      order.add_product(Product.new(name: 'product_name', type: :digital))
    end

    it 'expect to send email notification' do
      order.deliver

      expect(Notification).to have_received(:digital_purchase)
    end

    it 'expect to send voucher' do
      expect(order.customer.vouchers.length).to eq(0)

      order.deliver

      expect(order.customer.vouchers.length).to eq(1)
    end
  end
end

describe Membership do
  context 'initialize' do
    it 'expect to initialize data' do
      customer = Customer.new('a@a.com')
      membership = Membership.new(name: 'name')

      expect(membership.name).to eq('name')
      expect(membership.type).to eq(:membership)
      expect(membership.active).to eq(false)
    end
  end

  context 'activate' do
    it 'expect to activate membership' do
      customer = Customer.new('a@a.com')
      membership = Membership.new(name: 'name')

      expect{ membership.activate }
        .to change{ membership.active }.from(false).to(true)
    end
  end
end

describe Customer do
  subject(:subject) { described_class.new('email@email.com') }

  context 'initialize' do

    it 'expect to have an email' do
      expect{described_class.new()}.to raise_error(ArgumentError)
    end

    it 'stores email' do
      expect(subject.email).to eq('email@email.com')
    end

    it 'initialize vouchers as empty array' do
      expect(subject.vouchers).to eq([])
    end
  end

  context 'add_voucher' do
    it 'expect to store voucher' do
      voucher = Voucher.new(10.00)

      expect{subject.add_voucher(voucher)}.to change{subject.vouchers.length}.by(1)
    end
  end
end
