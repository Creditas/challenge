class Product
  attr_reader :name, :value

  def initialize(name:, value:)
    @name, @value = name, value
  end
end
