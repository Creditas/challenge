class Product
  attr_reader :name, :price, :type

  TYPE_PHYSICAL = 'physical'
  TYPE_BOOK = 'book'
  TYPE_DIGITAL = 'digital'
  TYPE_MEMBERSHIP = 'membership'

  def initialize(name:, price:, type:)
    @name, @price, @type = name, price, type
  end
end