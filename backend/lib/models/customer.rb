class Customer
  attr_reader :name, :email, :address, :memberships, :notifications

  def initialize(name:, email: ,address:)
    @name = name
    @email = email
    @address = address
    @memberships = []
    @notifications = []
  end

  def add_membership(membership)
    @memberships << membership
  end

  def add_notification(notification)
    @notifications << notification
  end
end
