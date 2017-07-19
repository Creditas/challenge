Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

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