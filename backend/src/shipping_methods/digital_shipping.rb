class DigitalShipping < ShippingMethod

    def dispatch
        send_email_notification
        # send_voucher
    end

    def send_email_notification
        mail = get_mail_message
        # MailTransport.send(mail) <~ Sends an e-mail
    end

    def get_mail_message
        mail = "To: " + @customer.email + "\n"
        mail += "Subject: Thanks for your purchase, " + @customer.name + "!\n"
        mail += "Body: Hello, " + @customer.name + ". "
        mail += "Your order: "
        mail += item_list
        mail += "\nRegards,"

        mail
    end
    
    def item_list
        ''
    end

end