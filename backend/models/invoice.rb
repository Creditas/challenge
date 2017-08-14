# frozen_string_literal: true

# Class responsible for manage both Customer (billing) address
# and Order (shipping) address (could be the same as billing address)
# For this test, a little refactor was done to use named parameters
class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(order:, billing_address:, shipping_address:)
    @order = order
    @billing_address = billing_address
    @shipping_address = shipping_address
  end
end
