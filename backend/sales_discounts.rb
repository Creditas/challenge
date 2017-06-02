module Sales
  module Discounts
    class Discount
      attr_reader :amount

      def initialize(amount)
        @amount = amount
      end

      def apply(items)
        raise NotImplementedError
      end
    end

    class FixedDiscount < Discount
      def apply(items)
        unless items.empty?
          unitary_discount = @amount / items.count

          items.each do |item|
            # Each product has its own price, but each
            # item carries the actual price to be paid.
            # To find the item price, we need to divide
            # our discount (let's say we have a discount
            # of $10) by the number of items in our order
            # (let's say 2). Now we know each of these
            # items should receive a discount of $5.
            item.price -= unitary_discount
          end
        end
      end
    end
  end
end
