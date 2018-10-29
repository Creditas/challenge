require 'test/unit'
require_relative '../src/credit_card'

class CreditCardTest < Test::Unit::TestCase

    def test_can_create_credit_card
        assert_instance_of(CreditCard, CreditCard.new)
    end
    
    def test_can_fetch_by_hash
        assert_instance_of(CreditCard, CreditCard.fetch_by_hashed('43567890-987654367'))
    end
end
