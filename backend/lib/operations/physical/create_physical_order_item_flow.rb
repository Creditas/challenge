module Operations
  module Physical
    class CreatePhysicalOrderItemFlow
      def initialize(order, order_item, overrides = {})
        @order_item = order_item
        @product = @order_item.product
        @commands = overrides.fetch(:commands) { default_commands }
      end
    
      def execute
        @commands.execute
      end
      
      def default_commands
        ::Domain::Commands::CreateShippingLabelCommand.new(@order_item, "Item #{@product.name}")
      end
    end
  end
end
