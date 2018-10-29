module Mailable
    def send_email_notification
        mail = get_mail_message
        # MailTransport.send(mail) <~ Sends an e-mail
    end
end
