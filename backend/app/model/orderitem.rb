class OrderItem
  attr_reader :order, :product, :item_type, :shipping_label, :voucher

  def initialize(order, product, item_type, shipping_label, voucher = 0)
    @order = order
    @product = product
    @item_type = item_type
    @shipping_label = shipping_label
    @voucher = voucher
  end

  def order=(order)
  	@order = order
  end

  def order
  	@order
  end  

  def product=(product)
  	@product = product
  end

  def product
  	@product
  end  

  def item_type=(item_type)
  	@item_type = item_type
  end

  def item_type
  	@item_type
  end

  def shipping_label=(shipping_label)
  	@shipping_label = shipping_label
  end

  def shipping_label
  	@shipping_label
  end

  def voucher=(voucher)
    @voucher = voucher
  end

  def voucher
    @voucher
  end
end