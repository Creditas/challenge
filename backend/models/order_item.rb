# frozen_string_literal: true

# Class responsible for each item in an order
class OrderItem
  attr_reader :order, :product
  attr_accessor :shipping_labels, :messages

  def initialize(order:, product:)
    @order = order
    @product = product
    @shipping_labels = []
    @messages = []
  end
end
