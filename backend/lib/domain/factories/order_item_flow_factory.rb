module Domain
  module Factories
    class OrderItemFlowFactory
      def initialize(product, overrides = {})
        @product = product
        @types = {
          'physical' => overrides.fetch(:physical) { ::Operations::Physical::CreatePhysicalOrderItemFlow },
          'book' => overrides.fetch(:book) { ::Operations::Book::CreateBookOrderItemFlow },
          'digital' => overrides.fetch(:digital) { ::Operations::Digital::CreateDigitalOrderItemFlow },
          'membership' => overrides.fetch(:membership) { ::Operations::Membership::CreateMembershipOrderItemFlow }
        }
      end

      def get_order_item_flow
        @types[@product.type]
      end
    end
  end  
end
