module Product
  class Membership < BasicProduct
    def initialize(name:, price:)
      type = :membership
      super(name: name, type: type, price: price)
    end
  end
end
