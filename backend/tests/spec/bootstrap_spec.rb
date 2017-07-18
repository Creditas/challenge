require_relative '../../bootstrap'

describe CreditCard do
  context 'fetch_by_hashed' do
   it 'return a class instance' do
     expect(subject).to be_instance_of(described_class)
   end
  end
end