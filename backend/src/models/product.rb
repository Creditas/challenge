class Product
  attr_reader :name,
  			  :price, 
  			  :type

  def initialize name:, price:, type: 
    @name = name 
    @price = price
    @type = type
  end
end