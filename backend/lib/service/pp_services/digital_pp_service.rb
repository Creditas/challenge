require_relative 'pp_service'
require_relative '../mail_service'
module Service
  class DigitalPPService < PPService
    def serve
      super
      MailService.new.send(mail_content)
      give_coupon
    end

    def mail_content
      "Items: #{@invoice.order.items.count}
      Amount: #{@invoice.order.total_amount}"
    end

    def give_coupon
      @invoice.order.customer.add_coupon(10)
    end
  end
end
