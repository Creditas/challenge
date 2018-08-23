class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type

  def initialize(name:, type:)
    @name, @type = name, type
  end

  def shippable?
    false
  end
end

class PhysicalProduct < Product
  def initialize(name:)
    super(name: name, type: :physical)
  end

  def shippable?
    true
  end

  def shipping_annotations
  end
end

class PhysicalBookProduct < PhysicalProduct
  def initialize(name:)
    super(name: name)
  end

  def shipping_annotations
    "\nItem isento de impostos conforme disposto na Constituição Art. 150, VI, d."
  end
end

class DigitalProduct < Product
  def initialize(name:)
    super(name: name, type: :digital)
  end
end

class SubscriptionProduct < Product
  def initialize(name:)
    super(name: name, type: :subscription)
  end
end
