require_relative '../../models/voucher'

module Vouchers
  class GiveVoucher

    def initialize(attributes)
      @customer = attributes.fetch(:customer)
      @value = attributes.fetch(:value)
    end

    def call
      voucher = Voucher.new(customer: @customer, value: @value)
      @customer.add_voucher(voucher)
      voucher
    end
  end
end
