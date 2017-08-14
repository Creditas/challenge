# frozen_string_literal: true

require_relative "#{Dir.pwd}/models/voucher"

# Class responsible for manage a Customer with some basic arguments
class Customer
  attr_reader :name, :email, :orders, :address
  attr_accessor :membership, :voucher, :has_voucher

  def initialize(name:, email:, membership: nil, address: '')
    @name = name
    @email = email
    @membership = membership
    @orders = []
    @address = address
    @voucher = Voucher.new
    @has_voucher = false
  end
end
