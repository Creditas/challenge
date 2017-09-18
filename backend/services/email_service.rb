# frozen_string_literal: true

# Class responsible for send an email to the customer
class EmailService
  def self.send(email, messages)
    messages.each do |message|
      %(
        Sending email to #{email}:
        Message: #{message}
      )
    end
  end
end
