class InvoiceFactory
  def initialize(type, billing_address, shipping_address, order)
    @type = type
    @billing_address = billing_address
    @shipping_address = shipping_address
    @order = order
  end

  def self.build(type:, billing_address:, shipping_address:, order:)
    new(type, billing_address, shipping_address, order).build
  end

  def build
    raise UndefinedInvoiceType.new("#{klass} is not a valid Invoice Type") unless klass

    klass.new(
      billing_address: billing_address,
      shipping_address: shipping_address,
      order: order
    ).tap do |invoice|
      invoice.process
    end
  end

  private

  attr_reader :type, :billing_address, :shipping_address, :order

  def klass
    @klass ||= begin
      class_name = "#{type.capitalize}Invoice"

      Object.const_get(class_name) if Object.const_defined?(class_name)
    end
  end

  class UndefinedInvoiceType < Exception; end
end