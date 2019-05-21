module Notifier
  class Mailer
    def self.welcome_membership(customer, item)
      p 'Welcome membership'
    end

    def self.available_product(item)
      p 'Available product'
    end

    def self.voucher(customer, value)
      p 'New voucher available'
    end
  end
end