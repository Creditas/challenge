require 'test/unit'
require_relative 'mock/discount_payment_aggregator_mock'
require_relative 'mock/email_sender_payment_aggregator_mock'
require_relative 'mock/printer_payment_aggregator_mock'
require_relative '../lib/services/payment_service'
require_relative '../lib/model/payment'
require_relative '../lib/model/order'
require_relative '../lib/model/product'

class PaymentServiceTests < Test::Unit::TestCase
  def setup
    @printer_aggregator = PrinterPaymentAggregatorMock.new "foo {{product}} data"
    @free_tax_printer_aggregator = PrinterPaymentAggregatorMock.new "foo {{product}} data with free tax"
    @subscription_email_sender_aggregator = EmailSenderPaymentAggregatorMock.new template: "subscription_template"
    @digital_media_email_sender_aggregator = EmailSenderPaymentAggregatorMock.new template: "digital_media_template"
    @discount_payment_aggregator = DiscountPaymentAggregatorMock.new discount_ammount: 10

    @payment_service = PaymentService.new
    @payment_service.add_aggregator aggregator: @printer_aggregator, product_type: :physical
    @payment_service.add_aggregator aggregator: @free_tax_printer_aggregator, product_type: :book
    @payment_service.add_aggregator aggregator: @subscription_email_sender_aggregator, product_type: :subscription
    @payment_service.add_aggregator aggregator: @discount_payment_aggregator, product_type: :digital_media, execute_before_payment: true
    @payment_service.add_aggregator aggregator: @digital_media_email_sender_aggregator, product_type: :digital_media

    @order = Order.new nil
    @payment = Payment.new({order: @order})
  end

  def test_pay__without_payment__should_raise
    assert_raise do
      @payment_service.pay(nil)
    end
  end

  def test_pay__physical_item__should_only_print_shipping_label
    @order.add_product Product.new(name: 'foo', type: :physical)
    @payment_service.pay(@payment)
    assert(@printer_aggregator.printed)
    assert_equal("foo {{product}} data", @printer_aggregator.printed_message)

    assert_equal(false, @free_tax_printer_aggregator.printed)
    assert_equal(false, @subscription_email_sender_aggregator.sent)
    assert_equal(false, @discount_payment_aggregator_mock.applied_discount)
    assert_equal(false, @digital_media_email_sender_aggregator.sent)
  end

  def test_pay__service_subscription__should_only_send_subscription_email
    @order.add_product Product.new(name: 'foo', type: :subscription)
    @payment_service.pay(@payment)
    assert(@subscription_email_sender_aggregator.sent)
    assert_equal("subscription_template", @subscription_email_sender_aggregator.template_sent)

    assert_equal(false, @printer_aggregator.printed)
    assert_equal(false, @free_tax_printer_aggregator.printed)
    assert_equal(false, @discount_payment_aggregator_mock.applied_discount)
    assert_equal(false, @digital_media_email_sender_aggregator.sent)
  end

  def test_pay__book__should_print_free_tax_shipping_label
    @order.add_product Product.new(name: 'foo', type: :book)
    @payment_service.pay(@payment)

    assert(@free_tax_printer_aggregator.printed)
    assert_equal("foo {{product}} data with free tax", @free_tax_printer_aggregator.printed_message)

    assert_equal(false, @printer_aggregator.printed)
    assert_equal(false, @subscription_email_sender_aggregator.sent)
    assert_equal(false, @discount_payment_aggregator_mock.applied_discount)
    assert_equal(false, @digital_media_email_sender_aggregator.sent)
  end

  def test_pay__digital_media_product__should_send_email_and_give_ten_bucks_discount
    @order.add_product Product.new(name: 'foo', type: :digital_media)
    @payment_service.pay(@payment)

    assert(@discount_payment_aggregator.applied_discount)

    assert_equal(false, @printer_aggregator.printed)
    assert_equal(false, @subscription_email_sender_aggregator.sent)
    assert_equal(false, @discount_payment_aggregator_mock.applied_discount)
    assert_equal(false, @digital_media_email_sender_aggregator.sent)
  end
end