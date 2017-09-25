class Membership
  attr_reader :name, :price, :status

  def initialize(name:, price:)
    @name, @price, @status = name, price, false
  end

  def enable
    @status = true
  end

  def disable
    @status = false
  end
end