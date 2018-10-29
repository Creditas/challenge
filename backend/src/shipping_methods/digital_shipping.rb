require_relative './mailable'

class DigitalShipping < ShippingMethod

    include Mailable

    def dispatch
        send_email_notification
        # send_voucher
    end

    def get_mail_message
        mail = "To: " + @customer.email + "\n"
        mail += "Subject: Thanks for your purchase, " + @customer.name + "!\n"
        mail += "Body: Hello, " + @customer.name + ". \n"
        mail += "Your order: \n"
        mail += @item_list
        mail += "\nRegards,"

        mail
    end
end