module Operations
  module Membership
    class CreateMembershipOrderItemFlow
      def initialize(order, order_item, overrides = {})
        @order = order
        @customer = @order.customer
        @product = order_item.product
        @commands = overrides.fetch(:commands) { default_commands }
      end
    
      def execute
        @commands.execute
      end
      
      def default_commands
        send_email = ::Domain::Commands::SendEmailCommand.new(@customer.email, 'subscriptions@creditas.com', 'Subscription Activated', 'Your new subscription is now active')
        ::Domain::Commands::AddMembershipCommand.new(@customer, @product.name, next_command: send_email)
      end
    end
  end
end
