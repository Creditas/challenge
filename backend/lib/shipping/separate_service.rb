require_relative 'deliver.rb'
require_relative 'physical_product_deliver.rb'
require_relative 'book_product_deliver.rb'
require_relative 'digital_product_deliver.rb'
require_relative 'membership_product_deliver.rb'

class SeparateService
  attr_reader :order, :customer

  def initialize(payment, order, customer)
    @payment = payment
    @order = order
    @customer = payment.order.customer
  end

  def process
    if @payment.paid?

      products = Array.new

      @order.items.each do |order_item|
        case order_item.product.type
          when :physical
            physical = PhysicalProductDeliver.new(@payment.invoice, @customer)
            products[0] = physical.process
          when :book
            book = BookProductDeliver.new(@payment.invoice, @customer)
            products[1] = book.process
          when :digital
            digital = DigitalProductDeliver.new(@payment.invoice, @customer)
            products[2] = digital.process
          when :membership
            membership = MembershipProductDeliver.new(@payment.invoice, @customer)
            products[3] = membership.process
        end
      end
      return products
    end
  end
end
