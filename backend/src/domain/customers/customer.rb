require_relative 'voucher'

class Customer
  attr_reader :id, :name, :email, :vouchers

  def initialize(id, name, email)
    @id = id
    @name = name
    @email = email
    @vouchers = []
  end

  def add_voucher(discount_value)
    @vouchers << Voucher.new(discount_value)
  end
end