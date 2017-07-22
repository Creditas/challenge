Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

describe Address do

  context 'initialize' do

    let(:zipcode) { '03136040' }
    subject(:address) { described_class.new(zipcode: zipcode) }

    it 'when expect to have a zipcode in Address' do
      expect{described_class.new()}.to raise_error(ArgumentError)
    end

    it 'with return a class instance' do
      expect(address).to be_instance_of(described_class)
    end

    it 'with correct zipcode' do
      expect(address.zipcode).to eq(zipcode)
    end

    it 'with incorrect zipcode' do
      expect(address.zipcode).not_to eq('07600000')
    end

  end
end