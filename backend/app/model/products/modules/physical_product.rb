module PhysicalProduct
  def type
    ProductsType::PHYSICAL
  end

  def process customer
    Label.new.generate_for customer
  end
end