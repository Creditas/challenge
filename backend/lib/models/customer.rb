class Customer
  attr_reader :name, :address

  def initialize(name: ,address:)
    @name = name
    @address = address
  end
end
