class Product
  include Preparer

  attr_reader :name

  def initialize(name)
    @name = name
  end
end