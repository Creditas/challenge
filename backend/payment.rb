require_relative 'invoice'
class Payment

  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at, :shipping_label

  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoice, @order = attributes.values_at(:invoice, :order)
    @payment_method = attributes.values_at(:payment_method)
  end

  def pay(paid_at = Time.now)
    @amount = order.total_amount
    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(billing_address: order.address, shipping_address: order.address, order: order)
    @paid_at = paid_at
    @order.items.each do |order_item|
        check_payment(order_item)
    end
    order.close(@paid_at)
  end

  def check_payment(order_item)
      command_for_order_item_type(order_item.product.type).execute(order_item)
  end

  def command_for_order_item_type(item_type)
      found_command = commands.find {|command| command.match?(item_type)}
  end

  def commands()
      physical_product_payment = PaymentPhysicalProductCommand.new
      membership_product_payment = PaymentMembershipProductCommand.new
      book_product_payment = PaymentBookProductCommand.new
      digital_product_payment = PaymentDigitalProductCommand.new
      no_action = PaymentNoActionProductCommand.new

      commands = [physical_product_payment, membership_product_payment, book_product_payment, digital_product_payment]
  end

  def paid?
    !paid_at.nil?
  end

end


class PaymentPhysicalProductCommand
    def match?(product_type)
        product_type == :physical
    end

    def execute(order_item)
        order_item.product.generate_shipping_label()
    end
end

class PaymentMembershipProductCommand
    def match?(product_type)
        product_type == :membership
    end

    def execute(order_item)
        order_item.order.customer.membership.activate()
    end
end

class PaymentBookProductCommand
    def match?(product_type)
        product_type == :book
    end

    def execute(order_item)
        order_item.product.generate_shipping_label_with_notification()
    end
end

class PaymentDigitalProductCommand
    def match?(product_type)
        product_type == :digital
    end

    def execute(order_item)
        order_item.generate_voucher_discount()
        order_item.send_email()
    end
end

class PaymentNoActionProductCommand
    def match?(product_type)
        true
    end

    def execute()
    end
end
