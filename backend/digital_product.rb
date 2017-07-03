class DigitalProduct < Product
  def buy **options
    super
    p "Sending email to #{options[:customer].name} with details on how to download #{name}"
    p "Sending promotional 10% OFF voucher to #{options[:customer].name}"
  end
end
