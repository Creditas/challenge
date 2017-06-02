class Physical < Product
  attr_accessor :shipping_label

  def prepare(order=nil)
    @shipping_label = message
  end

  private

  def message
    "Deverá ser colocado na caixa de envio"
  end
end