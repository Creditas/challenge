require 'test/unit'
require_relative '../src/address'

class AddressTest < Test::Unit::TestCase

  def setup
    @address = Address.new(zipcode: '04379-000')
  end

  def test_can_create_address    
    assert_instance_of(Address, @address)
  end

  def test_can_get_zipcode
    assert_equal(@address.zipcode, '04379-000')  
  end
end
