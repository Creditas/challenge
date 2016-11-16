class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type, :shipping_label

  def initialize(name:, type:)
    @name, @type = name, type
    @shipping_label = false
  end

  def generate_shipping_label()
      @shipping_label = true
  end

  def shipping_label?()
      @shipping_label
  end
end
