class DigitalProduct < Product
  def buy **options
    super
    p "Sending email to #{options[:customer].name} with details on how to download #{name}"
  end
end
