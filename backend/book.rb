require 'physical_product'
class Book < PhysicalProduct
  def generate_shipping_label
    super
    p "#{name} is a Book, taxes doesn't apply (Constituição Art. 150, VI, d)"
  end
end
