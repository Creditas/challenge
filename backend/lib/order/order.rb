class Order
  
  attr_reader :customer, :items, :payment, :closed_at, :code #:address already in customer

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
   # @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') } already in customer
  end

  def add_product(product)
    @items << @order_item_class.new(order: self, product: product)
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

  def product() 
    @items.map &:product
  end

  #def produto_por_tipo(tipo,&bloco) 
   # @items[type].each do |product|
    #  bloco.call product
  #end
  # remember: you can create new methods inside those classes to help you create a better design
end
