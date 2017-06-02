# I could send mail directly on the product type class, but i preferred create a class that allows implements mailer specific methods
class Mailer
  def self.send_mail(body)
    p body
  end
end