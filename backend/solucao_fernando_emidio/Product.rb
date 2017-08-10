#!/usr/bin/ruby -w

class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type, :activated

  def initialize(name:, type:)
    @name, @type = name, type
  end
end