
class ShippingLabel
  attr_reader :tax_free

  def initialize(tax_free = false)
    @tax_free = tax_free
  end

  def info
    if @tax_free
      'Conforme disposto na Constituição Art. 150, VI, d, esse item é isento de impostos'
    else
      'Shipping Label de itens não isentos de impostos'
    end
  end

end