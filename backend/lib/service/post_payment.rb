require_relative '../service/pp_services/book_pp_service'
require_relative '../service/pp_services/physical_pp_service'
require_relative '../service/pp_services/digital_pp_service'
require_relative '../service/pp_services/membership_pp_service'
module Service
  SERVICES = {
    :physical => PhysicalPPService,
    :book => BookPPService,
    :digital => DigitalPPService,
    :membership => MembershipPPService
  }

  def self.for(type)
    SERVICES[type]
  end

  class PostPayment
    def initialize(invoice)
      @invoice = invoice
    end

    def start
      @invoice.order.items.group_by {|g| g.product.type }.each do |type, items|
        Service.for(type).new(@invoice).serve
      end
    end
  end
end
