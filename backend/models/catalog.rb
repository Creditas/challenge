class Catalog
  #TODO: refactor after doing the service subscription factoy method
  def self.build_physical_product(name:, type:)
    Product.new(name: name, type: type.to_sym)
  end

  def self.build_digital_product(name:, type:)
    Product.new(name: name, type: type.to_sym)
  end
end

