# frozen_string_literal: true

# Class responsible for a Product
# It was created a constant Hash to hold was types
class Product
  attr_reader :name, :type, :value

  TYPE = {
    book: 'Book',
    digital: 'Digital',
    membership: 'Membership',
    physical: 'Physical'
  }.freeze

  def initialize(name, type, value)
    @name = name
    @type = TYPE[type]
    @value = value
  end
end
