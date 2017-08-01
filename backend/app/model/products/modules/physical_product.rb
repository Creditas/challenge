require_relative '../../shipping/label.rb'
module PhysicalProduct
  include Label

  def type
    ProductsType::PHYSICAL
  end

  def process customer
    generate_label_for customer
  end
end