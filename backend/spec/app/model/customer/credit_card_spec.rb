Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

describe CreditCard do

  context 'fetch_by_hashed' do

   let(:code) { '545454' }
   subject(:creditCard) { described_class.fetch_by_hashed(code) }

   it 'with return a class instance' do
     expect(creditCard).to be_instance_of(described_class)
   end

  end
end