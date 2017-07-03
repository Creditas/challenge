class Movie < DigitalProduct
  def buy **options
    super
    p "Sending promotional 10% OFF voucher to #{options[:customer].name}"
  end
end
