require_relative '../../vouchers/give_voucher'
require_relative '../../notification/customer_mailer'

module PostPayment
  class DigitalItemProcessor

    def initialize(attributes)
      @invoice = attributes.fetch(:invoice)
    end

    def perform
      Vouchers::GiveVoucher.new(customer: @invoice.customer, value: 10.0).call
      Notification::CustomerMailer.new(customer: @invoice.customer).order_receipt
    end
  end
end
