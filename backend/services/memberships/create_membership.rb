require_relative '../../models/membership'

module Memberships
  class CreateMembership

    def initialize(attributes)
      @customer = attributes.fetch(:customer)
    end

    def call
      membership = Membership.new(@customer, expire_at: Time.now + (60 * 60 * 24 * 30))
      @customer.add_membership(membership)
      membership.activate!
      membership
    end
  end
end