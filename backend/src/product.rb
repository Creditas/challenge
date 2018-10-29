class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type, :price, :attributes

  def initialize(name:, type:, price:, attributes:)
    @name = name
    @type = type
    @price = price
    @attributes = attributes
  end

  def to_s
    info = attributes.fetch(:full_name) + "\n"
    info += attributes.fetch(:artist) + "\n"
    info += "Price: $ " + @price.to_s + "\n"
    info += "--------------\n"

    info
  end
end