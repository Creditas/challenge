class ShippingLabel
  def initialize(name:, address:, notification:nil)
    @name = name
    @address = address
    @notification = notification
  end

  def print_format
    label = @name
    label += "\n#{@address}"
    label += "\n\nNOTIFICAÇÃO: #{@notification}" if @notification

    label
  end
end
