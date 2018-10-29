require 'test/unit'
require 'mocha/test_unit'
require_relative '../src/voucher'

class VoucherTest < Test::Unit::TestCase

  def setup
    customer = mock()
    @voucher = Voucher.new(customer, 10)
  end

  def test_can_create_voucher
    assert_instance_of(Voucher, @voucher)
  end

  def test_can_get_voucher_string
    expected = "You can use the coupon 10OFF to get $ 10 off on your next purchase."
    assert_equal(expected, @voucher.to_s)
  end
  
end
