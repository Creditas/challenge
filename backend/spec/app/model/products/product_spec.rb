Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

describe Product do

  context 'initialize' do

    subject(:product) { CommonBook.new(name: 'name') }

    it 'with return a class instance' do
      expect(product).to be_instance_of(CommonBook)
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
      @product = CommonBook.new(name: 'Some book')
      expect(@product.process(customer)).to include("the Constitution Art")
    end

    it 'With the product set as digital' do
      @product = DigitalProduct.new(name: 'Some movie')
      response_expected = "Send email to foo@bar.com.br with message: Your Some movie product is ready for download\nSugamele your voucher is  1234567890 with 10% OFF"
      expect(@product.process(customer)).to eq(response_expected)
    end

    it 'With the product set as membership' do
      @product = Membership.new(name: 'Some membership')
      response_expected = "Send email to foo@bar.com.br with message: Hello Sugamele, your signature has been successfully activated."
      expect(@product.process(customer)).to eq(response_expected)
    end

    it 'With the product set as physical' do
      @product = PhysicalProduct.new(name: 'Some physical')
      expect(@product.process(customer)).to eq("Label generated for Sugamele, put it in the shipping box")
    end

  end
end