require_relative '../product'

describe Product do
  before(:each) do
    @book = Product.new(name: 'Awesome book', type: :book)
  end

  describe 'has readable attributes' do
    it 'has a name' do
      expect(@book.name).to eq 'Awesome book'
    end

    it 'has a type' do
      expect(@book.type).to eq :book
    end
  end
end
