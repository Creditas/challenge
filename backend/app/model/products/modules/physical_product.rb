module PhysicalProduct
  def process
    create_shipping_label
  end

  private
  def create_shipping_label
   "Shipping Label for #{@name} created, put it in the shipping box"
  end
end