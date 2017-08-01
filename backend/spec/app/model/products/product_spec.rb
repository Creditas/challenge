Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

describe Product do

  context 'initialize' do

    subject(:product) { Product.new(name: 'name', type: CommonBook) }

    it 'when expect to have a name and a type' do
      expect{described_class.new()}.to raise_error(ArgumentError)
    end

    it 'with return a class instance' do
      expect(product).to be_instance_of(Product)
    end

    it 'with correct product name' do
      expect(product.name).to eq('name')
    end

    it 'with correct product type' do
      expect(product.type).to eq(ProductsType::BOOK)
    end

    it 'with incorrect product type' do
      expect(product.type).not_to eq('foo')
    end

  end

  context 'process' do

    subject(:customer) { Customer.new(name:'Sugamele', email:'foo@bar.com.br') }

    it 'With the product set as book' do
      @product = Product.new(name: 'Some book', type: CommonBook)
      expect(@product.process(customer)).to include("the Constitution Art")
    end

    it 'With the product set as digital' do
      @product = Product.new(name: 'Some movie', type: DigitalProduct)
      response_expected = "Send email to foo@bar.com.br with message: Your Some movie product is ready for download\nSugamele your voucher is  1234567890 with 10% OFF"
      expect(@product.process(customer)).to eq(response_expected)
    end

    it 'With the product set as membership' do
      @product = Product.new(name: 'Some membership', type: Membership)
      response_expected = "Send email to foo@bar.com.br with message: Hello Sugamele, your signature has been successfully activated."
      expect(@product.process(customer)).to eq(response_expected)
    end

    it 'With the product set as physical' do
      @product = Product.new(name: 'Some physical', type: PhysicalProduct)
      expect(@product.process(customer)).to eq("Label generated for Sugamele, put it in the shipping box")
    end

  end
end