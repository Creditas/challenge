module Product
  class PhysicalProduct < BasicProduct
    def initialize(name:, price:, type: :physical)
      super(name: name, type: type, price: price)
    end
  end
end
