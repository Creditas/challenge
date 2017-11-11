class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type, :price

  def initialize(name:, type:, price:)
    @name = name
    @type = type
    @price = price
  end
end
