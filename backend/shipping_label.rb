class ShippingLabel
    def generate_shipping_label(payment,orderItem)

    end
end

class FreeTaxShippingLabel < ShippingLabel
    def generate_shipping_label(payment,orderItem)
        puts "item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
    end
end

class DefaultShippingLabel < ShippingLabel
    def generate_shipping_label(payment, orderItem)
        customer = payment.order.customer
        order = payment.order
        puts "shipping label - > customer: " + customer.name + " zipcode:" + order.address.zipcode
    end
end
