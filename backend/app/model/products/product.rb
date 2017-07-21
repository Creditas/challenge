class Product
  attr_reader :name, :type

  def initialize(name:, type:)
    @name, @type = name, type
  end

  def process
    @product.extend Kernel.const_get(self.type)
    @product.process
  end

end