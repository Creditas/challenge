require 'securerandom'

CODE_BYTE_SIZE_8_CHARS = 4

class Voucher
  attr_reader :code, :payment, :value

  def initialize(value:, payment:)
    @value = value
    @payment = payment
    @code = generate_code
  end

  private

  def generate_code
    SecureRandom.hex(CODE_BYTE_SIZE_8_CHARS).upcase
  end
end
