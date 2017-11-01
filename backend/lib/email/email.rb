class Email
attr_reader :email_address, :subject , :text, :attachment
 
  def initialize(attributes = {})
    @email_address = attributes.values_at(:email_address)
    @subject = attributes.values_at(:subject)
    @text = attributes.values_at(:text)
    @attachment = attributes.values_at(:attachment)
    
  end

  def send_to_email()
   	puts "email enviado com sucesso!"
 end

end