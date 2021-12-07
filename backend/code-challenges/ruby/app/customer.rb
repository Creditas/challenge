class Customer
  attr_reader :income

  def initialize(attributes = {})
    @income = attributes[:income]
  end
end
