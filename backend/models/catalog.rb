class Catalog
  def self.build_physical_book(name:) 
    PhysicalBookProduct.new(name: name)
  end

  def self.build_physical_product(name:)
    PhysicalProduct.new(name: name)
  end

  def self.build_digital_product(name:)
    DigitalProduct.new(name: name)
  end
end

