module Operations
  module Digital
    class CreateDigitalOrderItemFlow
      def initialize(order, order_item, overrides = {})
        @order = order  
        @customer = @order.customer
        @order_item = order_item
        @commands = overrides.fetch(:commands) { default_commands }
      end
    
      def execute
        @commands.execute
      end
      
      def default_commands
        send_email = ::Domain::Commands::SendEmailCommand.new(@customer.email, 'orders@creditas.com', 'Your digital product is ready', 'Your new digital product is ready for use.')
        create_voucher = ::Domain::Commands::CreateVoucherCommand.new(@customer, 10, next_command: send_email)
      end
    end
  end
end
