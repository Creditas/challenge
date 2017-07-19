Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

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