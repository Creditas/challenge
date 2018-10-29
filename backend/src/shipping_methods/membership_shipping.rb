require_relative '../membership'
require_relative './mailable'

class MembershipShipping < ShippingMethod

    include Mailable

    def dispatch
        activate_membership
        send_email_notification
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
        membership = Membership.new()
        @customer.membership= membership
        
        membership.active!
    end
end
