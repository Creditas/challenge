class Voucher
  VOUCHER_SIZE = 8
  VOUCHER_CHARS = ("A".."Z")

  attr_reader :value, :code 

  def initialize(value:)
    @value = value
    @code = generate_code
  end

  private

  def generate_code
    (0...VOUCHER_SIZE).map { VOUCHER_CHARS.to_a[rand(26)] }.join
  end
end
