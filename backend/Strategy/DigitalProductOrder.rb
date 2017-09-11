require_relative '../Services/EmailSender.rb'
require_relative '../Services/Voucher.rb'

class DigitalProductOrder < Order
    attr_reader :email_message, :email_sender, :voucher

    def initialize(customer)
        super(customer)
        @email_sender = EmailSender.new       
        @voucher = Voucher.new  
    end

    def post_payment
        voucher.generate_voucher(customer.name, 10.00)      
        send_digital_customer_email
    end

    def send_digital_customer_email
        @email_message = "Parabéns você comprou: #{items.first.product.name}"
        @email_sender.send_email(customer.email, email_message)
    end
end