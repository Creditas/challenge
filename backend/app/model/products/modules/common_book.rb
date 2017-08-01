module CommonBook

  def type
    ProductsType::BOOK
  end

  def process customer
    shipping_label = Label.new
    shipping_label.add_notification "Item exempt from taxes as provided in the Constitution Art. 150, VI, d"
    shipping_label.generate_for customer
  end
end