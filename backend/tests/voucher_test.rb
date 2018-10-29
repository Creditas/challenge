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
    expected = "Utilize o cupom 10OFF para obter $ 10 de desconto."
    assert_equal(expected, @voucher.to_s)
  end
  
end