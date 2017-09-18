class Membership
  attr_reader :name, :price, :status

  def initialize(name:, price:)
    @name, @price, @status = name, price, true
  end
end