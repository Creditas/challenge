require_relative 'null_next_command'

module Domain
  module Commands
    class CreateShippingLabelCommand
      def initialize(order_item, message, overrides = {})
        @order_item = order_item
        @message = message
        @shipping_label_class = overrides.fetch(:shipping_label_class) { ::Domain::ShippingLabel }
        @next_command = overrides.fetch(:next_command) { NullNextCommand.new }
      end
      
      def execute
        create_shipping_label
        @next_command.execute
      end

      private

      def create_shipping_label
        @order_item.shipping_label = @shipping_label_class.new(message: @message)
      end
    end
  end
end
