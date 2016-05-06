# I could send mail directly on the product type class, but i preferred create a class that allows implements mailer specific methods
class Mailer
  def initialize(product_type)
    @product_type = product_type
  end

  def send_mail
    p @product_type.mail_body
  end
end