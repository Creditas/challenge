class DigitalInvoice < Invoice
  def process
    create_voucher
    email_customer
  end

  private

  attr_reader :voucher

  def create_voucher
    @voucher ||= Voucher.new(customer: customer)
  end

  def email_customer
    email = Email.new(customer)

    email.send_invoice_and_voucher(self, voucher)
  end
end
