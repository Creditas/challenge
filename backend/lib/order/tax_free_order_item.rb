class TaxFreeOrderItem < OrderItem

  def initialize(order:, product:)
    super
  end

  def create_invoice
    puts 'Invoice created with TAX FREE according Brazilian laws'
  end
end