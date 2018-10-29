module Mailable
  def send_email_notification
    mail = mail_message
    # MailTransport.send(mail) <~ Sends an e-mail
  end
end
