module ProductFactory

  attr_reader :name, :price, :type

  AVAILABLE_TYPES = [
      Product::TYPE_DIGITAL,
      Product::TYPE_MEMBERSHIP,
      Product::TYPE_BOOK,
      Product::TYPE_PHYSICAL
  ]

  def self.create(name:, price:, type:)
    raise ArgumentError, "Product type #{type.to_s} does not exist" unless self::AVAILABLE_TYPES.include?(type.to_s)
    return Product.new(name: name, price: price, type: type)
  end



end