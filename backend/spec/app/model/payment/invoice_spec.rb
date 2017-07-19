Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

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