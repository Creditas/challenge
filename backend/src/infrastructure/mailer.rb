class Mailer
  def send_email(to_address, message)
    puts "MAILER:\nE-mail '#{message}' sent to #{to_address}"
  end
end