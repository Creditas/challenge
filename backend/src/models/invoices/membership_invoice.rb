require_relative './invoice'

class MembershipInvoice < Invoice
  def initialize order:
    super
    create_membership
    send_notification
  end

  def create_membership
    puts 'Criei a assinatura'
  end

  def send_notification
    puts "Notifquei sobre a assinatura no email #{order.customer.email}"
  end
end
