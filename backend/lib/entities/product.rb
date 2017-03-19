class Product
  attr_reader :name, :type, :price

  def initialize(name, type, price=10)
    @name, @type, @price = name, type, price
  end
end
