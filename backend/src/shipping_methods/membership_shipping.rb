require_relative '../membership'

class MembershipShipping < ShippingMethod

    def dispatch
        send_email_notification
        activate_membership
    end

    def send_email_notification
        mail = get_mail_message
        # MailTransport.send(mail) <~ Sends an e-mail
    end

    def get_mail_message
        mail = "To: " + @customer.email + "\n"
        mail += "Subject: Thank you for subscribing, " + @customer.name + "!\n"
        mail += "Body: Welcome, " + @customer.name + ". "
        mail += "You can use your subscription right now clicking on the link below. "
        mail += "Regards,"

        mail
    end

    def activate_membership
        membership = Membership.new(@customer)
        membership.active!
    end
end