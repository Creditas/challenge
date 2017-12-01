class Product
  attr_reader :description, :type

  def initialize(description, type)
    @description = description
    @type = type
  end

  def total
    10
  end

end