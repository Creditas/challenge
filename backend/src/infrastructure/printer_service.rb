class PrinterService
  def print_label(shipping_label)
    p "ts='#{Time.now}' service='label' recipient='#{shipping_label.recipient}' subject='#{shipping_label.address}' observations='#{shipping_label.observations}'"
  end
end