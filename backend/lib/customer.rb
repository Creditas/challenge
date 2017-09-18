class Customer
  attr_reader :name, :email, :memberships, :credits

  def initialize(name:, email:)
    @name, @email, @memberships, @credits = name, email, [], 0
  end

  def add_membership(membership)
    @memberships << membership
  end

  def add_credit(value)
    @credits+=value.to_f
  end
end