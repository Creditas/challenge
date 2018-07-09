class Deliver
  attr_accessor :invoice, :customer

  def initialize(invoice, customer)
    @invoice = invoice
    @customer = customer
  end

  def process
  end
end
