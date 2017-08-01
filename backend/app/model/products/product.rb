class Product
  attr_reader :name, :product

  def initialize(name:, type:)
    @name = name
    @product = self.extend(type)
  end

end