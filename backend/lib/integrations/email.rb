class Email
  def initialize(customer)
    @customer = customer
  end

  def send_invoice_and_voucher(invoice, voucher)
    send_email("Invoice items: \n#{invoice.items.map { |item| "  name: #{item.name}, quantity: #{item.quantity}, unit price: #{item.price}" }.join("\n") }\nVoucher for #{invoice.customer.name} for R$ #{voucher.amount}")
  end

  def send_membership_activated(membership)
    send_email("Hi #{@customer.name} you are now registered!")
  end

  private

  def send_email(message)
    return true if ENV['RUBY_ENV'] == 'test'

    
    puts "--- EMAIl FOR #{@customer.email} START ---"
    puts message
    puts "---- EMAIL FOR #{@customer.email} END ----\n\n"
  end
end
