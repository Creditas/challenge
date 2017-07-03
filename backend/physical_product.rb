require 'product'
class PhysicalProduct < Product

  def buy **options
    super
    generate_shipping_label
  end

  def generate_shipping_label
    super
    p "Shipping Label for #{name} created, put it in the shipping box"
  end
end
