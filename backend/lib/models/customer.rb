class Customer
  attr_reader :name, :email, :address, :memberships, :notifications,
              :digital_medias, :vouchers

  def initialize(name:, email: ,address:)
    @name = name
    @email = email
    @address = address
    @digital_medias = []
    @memberships = []
    @notifications = []
    @vouchers = []
  end

  def add_digital_media(digital_media)
    @digital_medias << digital_media
  end

  def add_membership(membership)
    @memberships << membership
  end

  def add_notification(notification)
    @notifications << notification
  end

  def add_voucher(voucher)
    @vouchers << voucher
  end
end
