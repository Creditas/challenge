# frozen_string_literal: true

# Class responsible for each item in an order
class OrderItem
  attr_reader :product
  attr_accessor :shipping_labels, :messages

  def initialize(product)
    @product = product
    @shipping_labels = []
    @messages = []
  end
end
