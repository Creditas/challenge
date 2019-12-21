module Operations
  module Book
    class CreateBookOrderItemFlow
      def initialize(order, order_item, overrides = {})
        @order = order  
        @order_item = order_item
        @product = @order_item.product
        @commands = overrides.fetch(:commands) { default_commands }
      end
    
      def execute
        @commands.execute
      end
      
      def default_commands
        ::Domain::Commands::CreateShippingLabelCommand.new(@order_item, "Item #{@product.name} isento de impostos.")
      end
    end
  end
end
