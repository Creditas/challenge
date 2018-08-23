class Catalog
  def self.build_physical_product(name:, type:)
    Product.new(name: name, type: type.to_sym)
  end
end
