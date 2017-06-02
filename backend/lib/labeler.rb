# I could print shipping directly on the product type class, but i preferred create a class that allows implements label specific methods
class Labeler
  def self.print_shipping_label(shipping_label)
    p shipping_label
  end
end