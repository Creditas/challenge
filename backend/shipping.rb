module Shipping
    class ShippingLabel
        def create(orderItem, payment)

        end
    end
    class FreeShippingLabel
        def create(orderItem, payment)
            p "#{orderItem.product.name} seguirá isento de impostos conforme disposto na Constituição Art. 150, VI, d."
            p "O produto #{orderItem.product.name} será enviado para o codigo postal #{orderItem.order.address.zipcode} em nome de #{orderItem.order.customer.fullname}"
        end
    end
    class PaidShippingLabel
        def create(orderItem, payment)
            p "O produto #{orderItem.product.name} será enviado para o codigo postal #{orderItem.order.address.zipcode} em nome de #{orderItem.order.customer.fullname}"
        end    
    end
end