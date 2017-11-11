require_relative '../../notification/customer_mailer'
require_relative '../../memberships/create_membership'

module PostPayment
  class MembershipItemProcessor

    def initialize(attributes)
      @invoice = attributes.fetch(:invoice)
    end

    def perform
      Memberships::CreateMembership.new(customer: @invoice.customer).call
      Notification::CustomerMailer.new(customer: @invoice.customer).notify_new_membership
    end
  end
end