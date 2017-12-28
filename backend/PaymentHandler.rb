require_relative 'shipping.rb'
require_relative 'email.rb'
require_relative 'bootstrap.rb'

module paymentHandler
    class PaymentHandler
        attr_reader : payment, orderItem
        def self.new(orderItem)
            return case orderItem.product.type
            when :book 
                BookPaymentHandler.new
            when :physical
                PhysicalPaymentHandler.new
            when :digital
                DigitalPaymentHandler.new
            when :membership
                MemberShipPaymentHandler.new
            end
        end
        def conclude(orderItem, payment)
            label = Shipping::PaidShippingLabel.new
            label.create(orderItem, payment)
        end
    end
    class BookHandler < PaymentHandler
        def conclude(orderItem, payment)
            label = Shipping::FreeShippingLabel.new
            label.create(orderItem, payment)
            p "#{orderItem.product.name} pago com sucesso"    
        end
    end
    class PhysicalHandler < PaymentHandler
        def conclude(orderItem, payment)
            super
            p "#{orderItem.product.name} pago com sucesso"    
        end
    end
    class MembershipHandler < PaymentHandler
        def conclude(orderItem, payment)
            customer = payment.order.customer
            membership = Membership.new(name: @customer.name, email: @customer.email)
            membership.activate(customer: customer)
            email = Email.new
            email.sendMail(to: @customer.email, subject: "associação realizada", message: "Parabéns agora você é um #{@customer.name}")
        end
    end
    class DigitalHandler < PaymentHandler
        def conclude(orderItem, payment)
            customer = payment.order.customer
            email = Email.new
            email.sendMail(to: @customer.email, subject: "compra de um(a) #{orderItem.product.name}", message: "Parabéns você comprou um(a) #{orderItem.product.name} com sucesso e recebeu um ticket de desconto de 10 reais ")
            customer.giveVoucher(10)
        end
    end
end