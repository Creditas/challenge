# frozen_string_literal: true

# Class responsible for handle a voucher
class Voucher
  attr_reader :code, :value

  def initialize(code = '', value = 0.0)
    @code = code
    @value = value
  end
end
