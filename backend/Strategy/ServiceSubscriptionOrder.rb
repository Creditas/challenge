require_relative '../Services/Membership.rb'
require_relative '../Services/EmailSender.rb'

class ServiceSubscriptionOrder < Order     
    attr_reader :membership, :email_message, :email_sender

    def initialize(customer)
        super(customer)
        @membership = Membership.new(customer)
        @email_sender = EmailSender.new 
    end
    
    def post_payment
        @membership.subscription
        send_customer_email
    end

    def send_customer_email
        @email_message = "Parabéns você acaba de assinar o serviço #{items.first.product.name}!! Que é um serviço de excelente qualidade"
        @email_sender.send_email(customer.email, email_message)
    end
end
