class Order
  # Permissão de leitura para essas variáveis
  attr_reader :customer, :items, :payment, :address, :closed_at

  # Construtor
  def initialize(customer, overrides = {})
    # seta customer
    @customer = customer
    # define items como array vazio
    @items = []
    # Define a classe de cada item do Pedido, pode ser sobrescrito
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    # Define o endereço de entrega do Pedido, pode ser sobrescrito
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
  end

  # Adiciona produto ao Pedido
  def add_product(product)
    # Array  push
    @items << @order_item_class.new(order: self, product: product)
  end

  # Faz um map nos items e soma o total
  def total_amount
    @items.map(&:total).inject(:+)
  end

  # Finaliza pedido
  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

  # remember: you can create new methods inside those classes to help you create a better design
end