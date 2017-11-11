require_relative '../../infrastructure/printer'

module Delivery
  class BookShippingLabel
    def initialize(attributes = {})
      @item = attributes.fetch(:item)
      @printer = attributes.fetch(:printer, Infrastructure::Printer)
    end

    def generate
      @printer.new(content).print
    end

    private

    def content
      "Generating Shipping label for #{@item.type} \n" \
      'Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.'
    end
  end
end
