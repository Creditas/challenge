class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type, :value

  def initialize(name, type, value)
    @name = name
    @type = type
    @value = value
  end

  def name=(name)
    @name = name
  end

  def name
    @name
  end

  def type=(type)
    @type = type
  end

  def type
    @type
  end

  def value=(value)
  	@value = value
  end

  def value
  	@value
  end

end