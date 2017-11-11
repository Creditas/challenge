class Customer

  attr_reader :name, :email, :memberships, :vouchers

  def initialize(name:, email:, vouchers: [], memberships: [])
    @name = name
    @email = email
    @memberships = memberships
    @vouchers = vouchers
  end

  def add_membership(membership)
    @memberships << membership
  end

  def add_voucher(voucher)
    @vouchers << voucher
  end
end
