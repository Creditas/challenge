class BookStrategy < PhysicalStrategy

  def execute
    p "Book Strategy"
    super
  end

  def shipping_label
    super + "\n#{notification}"
  end

  def notification
    "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d"
  end

end
