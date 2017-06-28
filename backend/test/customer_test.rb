require 'test/unit'
load 'app/model/customer.rb'

class CustomerTest < Test::Unit::TestCase

  def setup
    @user = Customer.new(name="Felipe", email="felipe@teste.com", membership=nil)
  end

  def test_name
  	p @user.name
    assert_equal("Felipe", @user.name)
  end

  def test_email
  	p @user.email
    assert_equal("felipe@teste.com", @user.email)
  end

end