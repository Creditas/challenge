class ShippingLabel
  def initialize(receiver_name, shipping_address, notification = "")
    @receiver_name = receiver_name
    @shipping_address = shipping_address
    @notification = notification
  end

  def to_s
    shipping_label = "Destinatário: #{@receiver_name}\nEndereço: #{@shipping_address}"
    @notification != "" ? shipping_label << "\n(OBS.: #{@notification})" : shipping_label
  end
end