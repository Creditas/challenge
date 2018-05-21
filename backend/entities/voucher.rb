class Voucher
  attr_reader :value

  def initialize(attributes = {})
    @kind = attrs.values_at(:value)
  end
end
