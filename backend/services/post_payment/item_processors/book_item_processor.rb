require_relative '../../delivery/create_shipping_label'

module PostPayment
  class BookItemProcessor
    def initialize(attributes)
      @item = attributes.fetch(:item)
    end

    def perform
      Delivery::CreateShippingLabel.new(item: @item).call
    end
  end
end
