class Product
  attr_reader :id, :name, :category, :price

  def initialize(id, name, category, price=0)
    @id = id
    @name = name
    @category = category
    @price = price
  end
end
