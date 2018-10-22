module OrderItem
  class PhysicalItem < Item
    attr_reader :shipping_label

    def process
      @shipping_label = generate_shipping_label
      super
    end

    private

    def generate_shipping_label
      shipping_label = customer_name + "\n" + address
      shipping_label += "\n" + @product.tax_information if @product.tax_exempt?

      shipping_label
    end

    def address
      order.customer.address.to_s
    end

    def customer_name
      order.customer.name
    end
  end
end
