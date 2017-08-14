# frozen_string_literal: true

# Class responsible for manage the Credit Card
# For this test, no changes was made in this class besides rename 'code'
# to '_code' following Ruby conventions for unused method argument
class CreditCard
  def self.fetch_by_hashed(_code)
    CreditCard.new
  end
end
