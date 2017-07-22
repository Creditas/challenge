module PhysicalProduct
  attr_reader :customer

  def process customer
    Label.new.generate_for customer
  end
end