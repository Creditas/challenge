require_relative 'bootstrap'

module Sales
  module Conditions
    class Condition
      def applicable?(order)
        raise NotImplementedError
      end
    end

    class HasDigitalProduct < Condition
      def applicable?(order)
        order.items.any? { |item| item.product.is_a? DigitalProduct }
      end
    end
  end
end