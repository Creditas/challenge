class EmailSender
    attr_reader :membership, :email_message, :email_sender

    def send_email(to, message)
        "#{to}\n#{message}"  # < método que envia email para o cliente                
    end
end