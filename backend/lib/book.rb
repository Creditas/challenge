class Book < Product
  attr_accessor :shipping_label

  def prepare(order=nil)
    @shipping_label = message
  end

  private 

  def message
    "Item Isento de impostos conforme disposto na Constituição Art. 150, VI, d."
  end
end