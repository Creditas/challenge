class PhysicalInvoice < Invoice
  def process
    create_shipping_label
    Printer.print(@shipping_label.print_format)
  end

  private

  def create_shipping_label
    @shipping_label ||= ShippingLabel.new(
      name: customer.name,
      address: shipping_address
    )
  end
end
