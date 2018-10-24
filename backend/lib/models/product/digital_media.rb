module Product
  class DigitalMedia < BasicProduct
    def initialize(name:, price:)
      type = :digital
      super(name: name, type: type, price: price)
    end
  end
end
