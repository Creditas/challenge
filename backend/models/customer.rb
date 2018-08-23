class Customer
  attr_reader :name, :email_address, :email_notifications, :vouchers

  def initialize(name:, email_address: nil)
    @name = name
    @email_address = email_address
    @email_notifications = [] 
    @vouchers = [] 
  end

  def notify!(order_item, text)
    notification = EmailNotification.new(customer: self, to_address: email_address, order_item: order_item, body: text)
    @email_notifications << notification
  end
end
