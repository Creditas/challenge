class VoucherNotification < Notification
  attr_reader :voucher

  def initialize(customer, voucher)
    @customer = customer
    @voucher = voucher
    @content = build_content
  end

  def build_content
    "--Email containing voucher information--"
  end
end