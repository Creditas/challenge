module Delivery
  class PhysicalShippingLabel

    def initialize(attributes = {})
      @item = attributes.fetch(:item)
      @printer = attributes.fetch(:printer, Infrastructure::Printer)
    end

    def generate
      @printer.new(content).print
    end

    private

    def content
      "Generating Shipping label for #{@item.type} \n"  \
      'Etiqueta de entrega comum'
    end
  end
end
