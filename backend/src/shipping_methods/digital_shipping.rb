require_relative './mailable'
require_relative '../voucher'

class DigitalShipping < ShippingMethod
    
    include Mailable

    def dispatch
        send_email_notification
    end

    def get_mail_message
        voucher = Voucher.new(@customer, 10)
        
        mail = "To: " + @customer.email + "\n"
        mail += "Subject: Thanks for your purchase, " + @customer.name + "!\n"
        mail += "Body: Hello, " + @customer.name + ". \n"
        mail += "Your order: \n"
        mail += @item_list
        mail += voucher.to_s
        mail += "\nRegards,"

        mail
    end
end