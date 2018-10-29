class Customer
  # you can customize this class by yourself
  attr_reader :name, :address

  def initialize(name:, address:)
    @name = name
    @address = address
  end
end