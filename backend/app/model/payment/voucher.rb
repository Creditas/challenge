module Voucher

  def voucher_to (customer:, discount:)
    voucher = generate_voucher_by_customer
    "#{customer.name} your voucher is  #{voucher} with #{discount}% OFF"
  end

  private
  def generate_voucher_by_customer
    "1234567890"
  end

end