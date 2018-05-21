class Product
  attr_reader :name, :type, :price

  def initialize(name:, type:)
    @name, @type = name, type
  end

  def is_physical?
    type == :physical
  end

  def is_book?
    type == :book
  end

  def is_digital?
    type == :digital
  end

  def is_membership?
    type == :membership
  end
end
