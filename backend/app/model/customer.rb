class Customer
  attr_reader :name, :email, :membership, :orders, :address

  def initialize(name, email, membership = nil, address = nil)
  	@name = name
  	@email = email
  	@orders = []
  	@membership = membership
  	@address = address
  end

  def email
  	@email
  end

  def email=(email)
  	@email = email
  end

  def membership
  	@membership
  end

  def membership=(membership)
  	@membership = membership
  end

  def address
  	@address
  end

  def address=(address)
  	@address = address
  end

  def name
  	@name
  end

  def name=(name)
  	@name = name
  end

end