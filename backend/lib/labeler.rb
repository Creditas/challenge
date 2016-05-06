# I could print shipping directly on the product type class, but i preferred create a class that allows implements label specific methods
class Labeler
  def initialize(product_type)
    @product_type = product_type
  end

  def print_shipping_label
    p @product_type.shipping_label
  end
end