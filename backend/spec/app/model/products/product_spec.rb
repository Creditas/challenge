Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

describe Product do

  context 'initialize' do

    let(:type) { ProductsType::BOOK }
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

  context 'process' do

    it 'With the product set as book' do
      @product = Product.new(name: 'Some book', type: ProductsType::BOOK)
      expect(@product.process).to include("the Constitution Art")
    end

    it 'With the product set as digital' do
      @product = Product.new(name: 'Some book', type: ProductsType::MOVIE)
      expect(@product.process).to include("10% OFF voucher")
    end

    it 'With the product set as membership' do
      @product = Product.new(name: 'Some book', type: ProductsType::MEMBERSHIP)
      expect(@product.process).to include("Membership for customer activated")
    end

    it 'With the product set as physical' do
      @product = Product.new(name: 'Some book', type: ProductsType::PHYSICAL)
      expect(@product.process).to include("Shipping Label")
    end

  end
end