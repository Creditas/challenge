module CommonBook
  include Label

  def type
    ProductsType::BOOK
  end

  def process customer
    add_label_notification "Item exempt from taxes as provided in the Constitution Art. 150, VI, d"
    generate_label_for customer
  end
end