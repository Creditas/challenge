require_relative '../customer'
require_relative '../order'
require_relative '../invoice'

describe Invoice do
  before(:each) do
    @foolano = Customer.new
    @address = Address.new(zipcode:05654050)
    @book_order = Order.new(@foolano)
    @invoice = Invoice.new(billing_address: @address , shipping_address: @address, order: @book_order)
  end

# Como os attributes estão inseridos no objeto em forma de array, queremos garantir que dentro desse array temos o objeto desejado, e que ele seja o único componente do array (ao invés de 'hard code' e colocar colchete em volta do resultado)
  describe 'attributes' do
    it 'has a billing address' do
      expect(@invoice.billing_address.length).to eq 1
      expect(@invoice.billing_address[0]).to eq @address
    end

    it 'has a shipping address' do
      expect(@invoice.shipping_address.length).to eq 1
      expect(@invoice.shipping_address[0]).to eq @address
    end

    it 'has an order' do
      expect(@invoice.order.length).to eq 1
      expect(@invoice.order[0]).to eq @book_order
    end

  end
end
