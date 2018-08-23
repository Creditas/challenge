class Order
  attr_reader :customer, :items, :payment, :address, :closed_at, :shipping_label, :email_address

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
    @email_address = overrides.fetch(:email_address) { customer.email_address}
  end

  def add_item(product, price)
    @items << OrderItem.new(order: self, product: product, price: price)
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
    
    process_shipping
  end

  def process_shipping
    type = @items.first.product.type
    if type != :song
      @shipping_label = "#{customer.name}\nCEP: #{address.zipcode}"
      @shipping_label += "\nItem isento de impostos conforme disposto na Constituição Art. 150, VI, d." if type == :book
    else
      @customer.notify!(@items.first, "Song")
      @customer.vouchers << Voucher.new(value: 10)
    end
  end
end
