require 'test/unit'
require_relative '../src/invoice'

class InvoiceTest < Test::Unit::TestCase

  def setup
    @invoice = Invoice.new({
      :billing_address => 'Sample Billing Address',
      :shipping_address => 'Sample Shipping Address',
      :order => 'Sample Order'
    })
  end

  def test_can_create_invoice
    assert_instance_of(Invoice, @invoice)
  end

  def test_can_read_invoice_data
    assert_equal('Sample Billing Address', @invoice.billing_address.first)
    assert_equal('Sample Shipping Address', @invoice.shipping_address.first)
    assert_equal('Sample Order', @invoice.order.first)
  end
end