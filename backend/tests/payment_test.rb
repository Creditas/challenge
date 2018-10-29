require 'test/unit'
require 'mocha/test_unit'
require_relative '../src/payment'
require_relative '../src/invoice'

class PaymentTest < Test::Unit::TestCase

  def setup
    @basic_payment = Payment.new({
      :authorization_number => '123'
    })
  end

  def test_can_create_payment
    assert_instance_of(Payment, @basic_payment)
  end

  def test_can_get_payment_data
    assert_equal('123', @basic_payment.authorization_number)    
  end

  def test_can_pay
    timestamp = Time.now
    
    payment = Payment.new({
      :order => get_mock_order(timestamp)
    })

    assert_false(payment.paid?)
    assert_true(payment.pay(timestamp))
    assert_instance_of(Invoice, payment.invoice)    
    assert_not_nil(payment.paid_at)
    assert_true(payment.paid?)
  end

  def get_mock_order(timestamp)
    mock_order = mock()
    mock_order.expects(:total_amount).once.returns(30)
    mock_order.expects(:address).twice.returns(true)
    mock_order.expects(:close).with(timestamp).returns(true)
    mock_order
  end
end
