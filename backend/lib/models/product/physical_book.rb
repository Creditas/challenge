require_relative '../product/physical_product'

module Product
  class PhysicalBook < PhysicalProduct
    def initialize(name:, price:)
      type = :book
      super(name: name, type: type, price: price)
    end

    def tax_exempt?
      true
    end

    def tax_information
      "Isento de impostos conforme disposto na Constituicao Art. 150, VI, d."
    end
  end
end

