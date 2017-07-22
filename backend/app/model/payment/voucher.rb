class Voucher
  attr_reader :customer

  def initialize(customer)
    @customer = customer
  end

  def voucher_with value
    @voucher = generate_voucher_by_customer
    "#{@customer.name} your voucher is  #{@voucher} with #{value}% OFF"
  end

  private
  def generate_voucher_by_customer
    "1234567890"
  end

end