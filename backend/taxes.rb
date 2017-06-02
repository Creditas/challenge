module Taxes
  # Any taxes related information required by the
  # application should be handled by this class.
  # This class should delegate calculations to
  # more specific classes for calculations such as:
  # - PIS
  # - COFINS
  # - ICMS / ICMS ST
  # - Extimated total taxes
  class Service
    def taxes_free?(product)
      # In a real case scenario this would look into the
      # product's financial registry to fetch  PIS/COFINS
      # phase type or resolve it by the product's NCM.
      # And probably there wouldn't be a method named
      # `taxes_free?`.

      product.attributes.fetch(:is_book, false)
    end
  end
end
