module Sales
  module Actions
    class Action
      def execute(order)
        raise NotImplementedError
      end
    end

    class ApplyDiscount < Action
      attr_reader :discount, :restriction

      def initialize(discount, &restriction)
        @discount = discount
        @restriction = restriction
      end

      def execute(order)
        items = order.items
        items = restriction.call(items) unless restriction.nil?

        @discount.apply items
      end
    end
  end
end