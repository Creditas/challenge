module Domain
  class Customer
    attr_reader :name, :email, :address, :memberships, :vouchers

    def initialize(attributes = {})
      @name, @email, @address = attributes.values_at(:name, :email, :address)
      @memberships = []
      @vouchers = []
    end

    def add_membership(membership)
      @memberships << membership
    end

    def add_voucher(voucher)
      @vouchers << voucher
    end
  end
end
