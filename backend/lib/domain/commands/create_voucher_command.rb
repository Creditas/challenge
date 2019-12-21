require_relative 'null_next_command'

module Domain
  module Commands
    class CreateVoucherCommand
      def initialize(customer, discount_value, overrides = {})
        @customer = customer
        @discount_value = discount_value
        @voucher_class = overrides.fetch(:voucher_class) { ::Domain::Voucher }
        @next_command = overrides.fetch(:next_command) { NullNextCommand.new }
      end
      
      def execute
        create_voucher
        @next_command.execute
      end
      
      private

      def create_voucher
        @customer.add_voucher(@voucher_class.new(discount_value: @discount_value))
      end
    end
  end
end
