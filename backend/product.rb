class Product
  attr_reader :name

  def initialize(name:)
    @name = name
  end

  def buy **options
    p "Item #{name} bought"
  end

  def generate_shipping_label
    p "Generating shipping label for #{name}"
  end
end
