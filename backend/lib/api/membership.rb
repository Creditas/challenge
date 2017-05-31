class Membership
  attr_reader :email

  def initialize(email)
    @email = email
  end

  def activate
    MailService.new.send("Welcome! Your account has been created.")
  end
end
