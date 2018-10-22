module Product
  class BasicProduct
    # use type to distinguish each kind of product: physical, book, digital, membership, etc.
    attr_reader :name, :type, :price

    def initialize(name:, type:, price:)
      @name, @type, @price= name, type, price
    end

    def tax_exempt?
      false
    end
  end
end
