require_relative 'null_next_command'

module Domain
  module Commands
    class AddMembershipCommand
      def initialize(customer, name, overrides = {})
        @customer = customer
        @name = name
        @membership_class = overrides.fetch(:membership_class) { ::Domain::Membership }
        @next_command = overrides.fetch(:next_command) { NullNextCommand.new }
      end
      
      def execute
        activate_membership
        @next_command.execute
      end
      
      private

      def activate_membership
        @customer.add_membership(@membership_class.new(@name, true))
      end
    end
  end
end
