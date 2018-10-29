require_relative './mailable'
require_relative '../voucher'

class DigitalShipping < ShippingMethod
    
    include Mailable

    def dispatch
        create_voucher
        send_email_notification
    end

    def create_voucher
        @customer.voucher = Voucher.new(@customer, 10)
    end

    def get_mail_message
        mail = "To: " + @customer.email + "\n"
        mail += "Subject: Thanks for your purchase, " + @customer.name + "!\n"
        mail += "Body: Hello, " + @customer.name + ". \n"
        mail += "Your order: \n"
        mail += @item_list
        mail += @customer.voucher.to_s
        mail += "\nRegards,"

        mail
    end
end