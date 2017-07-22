class Product
  attr_reader :name, :type, :product

  def initialize(name:, type:)
    @name, @type = name, type
    @product = self
  end

  def process customer
    @product.extend Kernel.const_get(self.type)
    @product.process (customer)
  end

end