require_relative './invoice'

class DigitalInvoice < Invoice
  def initialize order:
    super
    generate_voucher
    send_notification
  end

  def generate_voucher
    puts 'Gerei o "Voucher"'
  end

  def send_notification
    puts "Notifquei sobre o voucher no email #{order.customer.email}"
  end
end
