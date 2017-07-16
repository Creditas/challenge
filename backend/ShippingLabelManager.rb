class ShippingLabelManager
    def self.generate_shipping_label(customer, product, options={})
        @has_taxes = options.fetch('has_taxes', true);
        # omitted code
    end
end