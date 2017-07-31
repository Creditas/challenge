module Product
  attr_reader :name, :type, :product

  def initialize(name:)
    @name = name
    @product = self
  end

  def process customer
    @product.process (customer)
  end

end