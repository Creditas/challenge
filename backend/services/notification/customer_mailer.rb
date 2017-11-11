require_relative 'mailer'

module Notification
  class CustomerMailer

    def initialize(attributes = {})
      @customer = attributes.fetch(:customer)
      @mailer = attributes.fetch(:mailer, Notification::Mailer)
    end

    def notify_new_membership
      @mailer.new(recipient: @customer.email,
                  template: membership_template)
             .deliver_later
    end

    def order_receipt
      @mailer.new(recipient: @customer.email,
                  template: order_receipt_template)
             .deliver_later
    end

    private

    def membership_template
      'Membership Item - New Membership Notification'
    end

    def order_receipt_template
      'Digital Item - Order description'
    end
  end
end
